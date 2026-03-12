import { memo, useState } from "react"
import { motion } from "framer-motion"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Lesson {
  subject: string
  teacher: string
  room: string
  time: string
  span: number // rowspan
  color: number // 0–9 → note-X palette
}

type DaySchedule = (Lesson | null)[] // null = spanned by previous row

// ─── Color palette (mirrors note-0 … note-9 in BCB Edu CSS) ─────────────────

const NOTE_PALETTE: { bg: string; border: string; text: string; soft: string }[] = [
  { bg: "#EFF6FF", border: "#BFDBFE", text: "#1E40AF", soft: "#DBEAFE" }, // 0 blue
  { bg: "#F0FDF4", border: "#BBF7D0", text: "#166534", soft: "#DCFCE7" }, // 1 green
  { bg: "#FAF5FF", border: "#E9D5FF", text: "#6B21A8", soft: "#F3E8FF" }, // 2 purple
  { bg: "#FFF7ED", border: "#FED7AA", text: "#9A3412", soft: "#FFEDD5" }, // 3 orange
  { bg: "#F0FDFA", border: "#99F6E4", text: "#134E4A", soft: "#CCFBF1" }, // 4 teal
  { bg: "#FFF1F2", border: "#FECDD3", text: "#9F1239", soft: "#FFE4E6" }, // 5 rose
  { bg: "#EEF2FF", border: "#C7D2FE", text: "#3730A3", soft: "#E0E7FF" }, // 6 indigo
  { bg: "#FEFCE8", border: "#FEF08A", text: "#854D0E", soft: "#FEF9C3" }, // 7 yellow
  { bg: "#FDF4FF", border: "#F5D0FE", text: "#701A75", soft: "#FAE8FF" }, // 8 fuchsia
  { bg: "#ECFDF5", border: "#6EE7B7", text: "#065F46", soft: "#D1FAE5" }, // 9 emerald
]

// ─── Static schedule data (simplified) ───────────────────────────────────────

const CLASSES = ["X DKV 1", "X TKJ 1", "XI DPIB 1", "XII TBSM 1"]
const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"]

// Each entry: [subject, teacher, room, time, span, color]
// null = cell is covered by a rowspan above
const SCHEDULE: Record<string, Record<string, (Lesson | null)[]>> = {
  "X DKV 1": {
    Senin: [
      { subject: "Instalasi Motor Listrik", teacher: "Iqbal Iswahyudi, ST.", room: "R.2.16", time: "07:30–08:46", span: 2, color: 6 },
      null,
      { subject: "Instalasi Penerangan", teacher: "Viky Dimas, S.Pd.", room: "R.2.14", time: "08:46–10:02", span: 2, color: 7 },
      null,
      { subject: "Seni Budaya", teacher: "Yunika Damayanti, S.Pd.", room: "R.2.16", time: "13:24–14:40", span: 2, color: 7 },
    ],
    Selasa: [
      { subject: "BK", teacher: "Winda Ratna, S.Pd.", room: "R.2.16", time: "07:00–08:16", span: 2, color: 0 },
      null,
      { subject: "Koding Kecerdasan AI", teacher: "Sidik Efendi, S.Kom.", room: "Lab TI", time: "08:16–09:32", span: 2, color: 9 },
      null,
      { subject: "Produk Kewirausahaan", teacher: "Adhitya Erlangga, S.Pd.", room: "R.2.16", time: "09:52–10:30", span: 1, color: 3 },
    ],
    Rabu: [
      { subject: "Bahasa Jawa", teacher: "Diana Devi, S.Pd.", room: "R.2.16", time: "07:00–08:16", span: 2, color: 8 },
      null,
      { subject: "Konsentrasi Keahlian", teacher: "Mackrop Julianto", room: "R.3.01", time: "08:16–09:32", span: 2, color: 2 },
      null,
      { subject: "Mapel Pilihan", teacher: "Eka Wahyudi", room: "R.2.16", time: "09:32–10:10", span: 1, color: 4 },
    ],
    Kamis: [
      { subject: "Matematika", teacher: "Hana Luayyi, S.Pd.", room: "R.2.16", time: "07:00–08:16", span: 2, color: 5 },
      null,
      { subject: "Perbaikan Peralatan", teacher: "Iqbal Iswahyudi, ST.", room: "Lab EL", time: "08:16–09:32", span: 2, color: 6 },
      null,
      { subject: "Projek Ipas", teacher: "Dini Anjarwati, S.Pd.", room: "R.2.16", time: "11:08–11:46", span: 1, color: 1 },
    ],
    Jumat: [
      { subject: "Bahasa Indonesia", teacher: "Danang Dwi, S.Pd.", room: "R.2.16", time: "07:00–07:50", span: 1, color: 3 },
      { subject: "Bahasa Inggris", teacher: "Selvia Dewi, S.Pd.", room: "R.2.16", time: "07:50–08:40", span: 1, color: 4 },
      { subject: "Pendidikan Pancasila", teacher: "Yenny Nurhayati, S.Pd.", room: "R.2.16", time: "08:40–09:20", span: 1, color: 1 },
      null,
      null,
    ],
  },
  "X TKJ 1": {
    Senin: [
      { subject: "Dasar Jaringan", teacher: "Budi Santoso, S.Kom.", room: "Lab Net", time: "07:00–08:16", span: 2, color: 9 },
      null,
      { subject: "Pemrograman Web", teacher: "Rina Susanti, S.Pd.", room: "Lab TI", time: "08:16–10:02", span: 2, color: 0 },
      null,
      { subject: "Matematika", teacher: "Hana Luayyi, S.Pd.", room: "R.1.08", time: "10:22–11:00", span: 1, color: 5 },
    ],
    Selasa: [
      { subject: "Bahasa Indonesia", teacher: "Danang Dwi, S.Pd.", room: "R.1.08", time: "07:00–07:50", span: 1, color: 3 },
      { subject: "Pendidikan Agama", teacher: "A. Ulin Nuha, M.Pd.", room: "R.1.08", time: "07:50–09:06", span: 2, color: 2 },
      null,
      { subject: "Teknik Informatika", teacher: "Dinda Chyinthia, S.Pd.", room: "Lab TI", time: "09:32–11:08", span: 2, color: 6 },
      null,
    ],
    Rabu: [
      { subject: "Administrasi Sistem", teacher: "Budi Santoso, S.Kom.", room: "Lab Net", time: "07:00–08:46", span: 2, color: 9 },
      null,
      { subject: "Penjas Orkes", teacher: "Agi Yanuar, S.Pd.", room: "Lapangan", time: "08:46–10:02", span: 2, color: 1 },
      null,
      { subject: "Bahasa Inggris", teacher: "Selvia Dewi, S.Pd.", room: "R.1.08", time: "10:22–11:00", span: 1, color: 4 },
    ],
    Kamis: [
      { subject: "Pemrograman Web", teacher: "Rina Susanti, S.Pd.", room: "Lab TI", time: "07:00–08:46", span: 2, color: 0 },
      null,
      { subject: "Sejarah Indonesia", teacher: "Unang Jaka, S.Pd.", room: "R.1.08", time: "08:46–09:32", span: 1, color: 7 },
      { subject: "Seni Budaya", teacher: "Yunika Damayanti, S.Pd.", room: "R.1.08", time: "09:52–11:08", span: 2, color: 8 },
      null,
    ],
    Jumat: [
      { subject: "Matematika", teacher: "Hana Luayyi, S.Pd.", room: "R.1.08", time: "07:00–08:16", span: 2, color: 5 },
      null,
      { subject: "Bahasa Jawa", teacher: "Diana Devi, S.Pd.", room: "R.1.08", time: "08:16–09:02", span: 1, color: 8 },
      null,
      null,
    ],
  },
  "XI DPIB 1": {
    Senin: [
      { subject: "Konstruksi Bangunan", teacher: "Arif Budiman, S.T.", room: "Lab DPIB", time: "07:00–08:46", span: 2, color: 3 },
      null,
      { subject: "Gambar Teknik", teacher: "Slamet Riyadi, S.Pd.", room: "Lab CAD", time: "08:46–10:32", span: 2, color: 6 },
      null,
      { subject: "Fisika Terapan", teacher: "Wahyu Prabowo, S.Pd.", room: "R.2.04", time: "10:52–11:30", span: 1, color: 0 },
    ],
    Selasa: [
      { subject: "Estimasi Biaya", teacher: "Dewi Kartika, S.T.", room: "R.2.04", time: "07:00–08:16", span: 2, color: 9 },
      null,
      { subject: "Bahasa Indonesia", teacher: "Danang Dwi, S.Pd.", room: "R.2.04", time: "08:16–09:02", span: 1, color: 3 },
      { subject: "Matematika", teacher: "Hana Luayyi, S.Pd.", room: "R.2.04", time: "09:02–10:18", span: 2, color: 5 },
      null,
    ],
    Rabu: [
      { subject: "Gambar Teknik", teacher: "Slamet Riyadi, S.Pd.", room: "Lab CAD", time: "07:00–09:32", span: 2, color: 6 },
      null,
      { subject: "Penjas Orkes", teacher: "Agi Yanuar, S.Pd.", room: "Lapangan", time: "09:52–11:08", span: 2, color: 1 },
      null,
      { subject: "Bahasa Inggris", teacher: "Selvia Dewi, S.Pd.", room: "R.2.04", time: "11:08–11:46", span: 1, color: 4 },
    ],
    Kamis: [
      { subject: "Konstruksi Bangunan", teacher: "Arif Budiman, S.T.", room: "Lab DPIB", time: "07:00–09:32", span: 2, color: 3 },
      null,
      { subject: "Pendidikan Agama", teacher: "A. Ulin Nuha, M.Pd.", room: "R.2.04", time: "09:52–11:08", span: 2, color: 2 },
      null,
      null,
    ],
    Jumat: [
      { subject: "Kimia Terapan", teacher: "Lestari Utami, S.Pd.", room: "Lab IPA", time: "07:00–08:16", span: 2, color: 7 },
      null,
      { subject: "Seni Budaya", teacher: "Yunika Damayanti, S.Pd.", room: "R.2.04", time: "08:16–09:02", span: 1, color: 8 },
      null,
      null,
    ],
  },
  "XII TBSM 1": {
    Senin: [
      { subject: "Perawatan Mesin", teacher: "Hendra Susilo, S.T.", room: "Lab TBSM", time: "07:00–09:32", span: 2, color: 5 },
      null,
      { subject: "Kelistrikan Otomotif", teacher: "Fajar Nugroho, S.Pd.", room: "Lab OTO", time: "09:52–11:38", span: 2, color: 6 },
      null,
      { subject: "Matematika", teacher: "Hana Luayyi, S.Pd.", room: "R.3.02", time: "13:00–13:38", span: 1, color: 5 },
    ],
    Selasa: [
      { subject: "Teknik Sepeda Motor", teacher: "Hendra Susilo, S.T.", room: "Lab TBSM", time: "07:00–09:32", span: 2, color: 3 },
      null,
      { subject: "Bahasa Indonesia", teacher: "Danang Dwi, S.Pd.", room: "R.3.02", time: "09:52–10:30", span: 1, color: 3 },
      { subject: "Sejarah Indonesia", teacher: "Unang Jaka, S.Pd.", room: "R.3.02", time: "10:30–11:08", span: 1, color: 7 },
      null,
    ],
    Rabu: [
      { subject: "PKK", teacher: "Adhitya Erlangga, S.Pd.", room: "R.3.02", time: "07:00–08:16", span: 2, color: 9 },
      null,
      { subject: "Kelistrikan Otomotif", teacher: "Fajar Nugroho, S.Pd.", room: "Lab OTO", time: "08:16–10:02", span: 2, color: 6 },
      null,
      { subject: "Bahasa Inggris", teacher: "Selvia Dewi, S.Pd.", room: "R.3.02", time: "10:22–11:00", span: 1, color: 4 },
    ],
    Kamis: [
      { subject: "Teknik Sepeda Motor", teacher: "Hendra Susilo, S.T.", room: "Lab TBSM", time: "07:00–09:32", span: 2, color: 3 },
      null,
      { subject: "Penjas Orkes", teacher: "Agi Yanuar, S.Pd.", room: "Lapangan", time: "09:52–11:08", span: 2, color: 1 },
      null,
      null,
    ],
    Jumat: [
      { subject: "Pendidikan Agama", teacher: "A. Ulin Nuha, M.Pd.", room: "R.3.02", time: "07:00–08:16", span: 2, color: 2 },
      null,
      { subject: "Seni Budaya", teacher: "Yunika Damayanti, S.Pd.", room: "R.3.02", time: "08:16–09:02", span: 1, color: 8 },
      null,
      null,
    ],
  },
}

// ─── SubjectCard ─────────────────────────────────────────────────────────────

const SubjectCard = memo(function SubjectCard({ lesson }: { lesson: Lesson }) {
  const [hovered, setHovered] = useState(false)
  const palette = NOTE_PALETTE[lesson.color]

  return (
    <div
      className="h-full rounded-[10px] p-[10px] flex flex-col gap-[5px] cursor-default select-none"
      style={{
        backgroundColor: hovered ? palette.soft : palette.bg,
        border: `1px solid ${palette.border}`,
        boxShadow: hovered
          ? "0 4px 12px rgba(0,0,0,0.10)"
          : "0 1px 3px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        transition: "all 180ms ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <p
        className="font-semibold leading-snug line-clamp-2"
        style={{ color: palette.text, fontSize: "11px" }}
      >
        {lesson.subject}
      </p>
      <p className="truncate" style={{ color: palette.text, fontSize: "10px", opacity: 0.65 }}>
        {lesson.teacher}
      </p>
      <div className="mt-auto flex items-center justify-between flex-wrap gap-[3px]">
        <span
          className="leading-none rounded-[6px] px-[7px] py-[4px] font-medium"
          style={{
            fontSize: "10px",
            backgroundColor: "rgba(255,255,255,0.7)",
            color: "#374151",
            backdropFilter: "blur(4px)",
          }}
        >
          {lesson.time}
        </span>
        <span
          className="flex items-center gap-[3px] font-medium"
          style={{ fontSize: "10px", color: "#6B7280" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          {lesson.room}
        </span>
      </div>
    </div>
  )
})

// ─── ScheduleTable ────────────────────────────────────────────────────────────

const TIME_SLOTS = [
  { slot: "1", label: "07:00" },
  { slot: "2", label: "07:45" },
  { slot: "3", label: "08:30" },
  { slot: "4", label: "09:15" },
  { slot: "5", label: "10:00" },
]

const ScheduleTable = memo(function ScheduleTable({ selectedClass }: { selectedClass: string }) {
  const classData = SCHEDULE[selectedClass] || {}

  return (
    <div className="overflow-x-auto hidden-scroll">
      <table style={{ width: "100%", tableLayout: "fixed", borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr>
            {/* Jam column */}
            <th
              style={{
                width: "52px",
                height: "36px",
                padding: "0 8px",
                fontSize: "11px",
                textAlign: "center",
                fontWeight: 600,
                color: "#6B7280",
                position: "sticky",
                left: 0,
                zIndex: 20,
                backgroundColor: "var(--color-surface, #F8FAFC)",
              }}
            >
              Jam
            </th>
            {DAYS.map((day) => (
              <th
                key={day}
                style={{
                  padding: "0 6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#374151",
                  textAlign: "left",
                }}
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TIME_SLOTS.map((ts, rowIdx) => (
            <tr key={ts.slot}>
              {/* Time label */}
              <td
                style={{
                  padding: "5px 8px",
                  fontSize: "10px",
                  textAlign: "center",
                  fontWeight: 500,
                  color: "#9CA3AF",
                  verticalAlign: "top",
                  position: "sticky",
                  left: 0,
                  zIndex: 10,
                  backgroundColor: "var(--color-surface, #F8FAFC)",
                }}
              >
                <div>{ts.slot}</div>
                <div style={{ fontSize: "9px", marginTop: "2px", opacity: 0.7 }}>{ts.label}</div>
              </td>
              {DAYS.map((day) => {
                const cell = classData[day]?.[rowIdx]
                // null = covered by rowspan
                if (cell === null) return null
                // undefined = no lesson
                if (cell === undefined) {
                  return (
                    <td
                      key={day}
                      style={{ padding: "5px 5px", height: "72px", verticalAlign: "top" }}
                    />
                  )
                }
                return (
                  <td
                    key={day}
                    rowSpan={cell.span}
                    style={{ padding: "5px 5px", height: cell.span * 72 + "px", verticalAlign: "top" }}
                  >
                    <SubjectCard lesson={cell} />
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

// ─── Sidebar nav items ────────────────────────────────────────────────────────

const NAV_ITEMS: { icon: string; label: string; active?: boolean }[] = [
  { icon: "📚", label: "Tahun Ajaran" },
  { icon: "🕐", label: "Jadwal Pelajaran", active: true },
  { icon: "📋", label: "Izin Guru" },
  { icon: "🔄", label: "Tukar Jadwal" },
  { icon: "✅", label: "Presensi" },
  { icon: "📈", label: "Jurnal Mengajar" },
]

// ─── BCB Edu Logo (inline SVG, simplified) ───────────────────────────────────

function BcbLogo() {
  return (
    <svg viewBox="0 0 280 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: "28px" }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M140 340C148 340 152 337 155 334C158 330 160 327 163 323L258 188C266 177 279 164 280 146H140L140 340Z" fill="#FABF22" />
      <path fillRule="evenodd" clipRule="evenodd" d="M140 340L140 146H0C-1 161 7 167 13 175C19 183 24 191 30 200L98 297C102 302 105 306 108 310C117 322 124 339 140 340Z" fill="#22AE87" />
      <path fillRule="evenodd" clipRule="evenodd" d="M140 146C187 146 140 146 280 146C280 129 263 118 249 103L159 11C154 5 150 0 140 0L140 146Z" fill="#F66169" />
      <path fillRule="evenodd" clipRule="evenodd" d="M0 145H140L140 0C128 1 124 8 116 16L30 105C24 111 18 116 13 122C7 129 1 133 0 145Z" fill="#774CF4" />
    </svg>
  )
}

// ─── Main ScheduleMockup component ───────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.4 } },
}

const panelVariants = {
  hidden: { opacity: 0, x: 60, y: -40 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
}

export const ScheduleMockup = memo(function ScheduleMockup() {
  const [activeClass, setActiveClass] = useState("X DKV 1")

  return (
    <motion.div
      className="w-full h-full flex overflow-hidden"
      style={{ backgroundColor: "var(--color-background, #F1F5F9)", fontFamily: "inherit" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── Sidebar ── */}
      <motion.aside
        variants={panelVariants}
        style={{
          width: "180px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          background: "var(--color-surface, #FFFFFF)",
          borderRight: "1px solid var(--color-border, #E2E8F0)",
        }}
      >
        {/* Logo row */}
        <div
          style={{
            padding: "14px 12px 10px",
            borderBottom: "1px solid var(--color-border, #E2E8F0)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <BcbLogo />
        </div>

        {/* School name */}
        <div style={{ padding: "10px 14px 8px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-1, #0F172A)" }}>
            skarisa
          </p>
          <p style={{ fontSize: "10px", color: "var(--color-text-2, #64748B)", marginTop: "1px" }}>
            SMK PGRI 1 Nganjuk
          </p>
        </div>

        {/* Section label */}
        <div style={{ padding: "4px 14px 4px", fontSize: "9px", fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Akademik
        </div>

        {/* Nav items */}
        <nav style={{ padding: "2px 8px", flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "7px 8px",
                borderRadius: "8px",
                marginBottom: "1px",
                fontSize: "11px",
                fontWeight: item.active ? 600 : 400,
                color: item.active ? "var(--color-primary, #6366F1)" : "var(--color-text-2, #64748B)",
                backgroundColor: item.active ? "color-mix(in srgb, var(--color-primary, #6366F1) 8%, transparent)" : "transparent",
                cursor: "default",
              }}
            >
              <span style={{ fontSize: "13px", lineHeight: 1 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {/* Avatar */}
        <div
          style={{
            padding: "10px 14px",
            borderTop: "1px solid var(--color-border, #E2E8F0)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "color-mix(in srgb, var(--color-primary, #6366F1) 15%, white)",
              color: "var(--color-primary, #6366F1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            AD
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: "10px", fontWeight: 600, color: "var(--color-text-1, #0F172A)", truncate: true }}>Admin</p>
            <p style={{ fontSize: "9px", color: "#94A3B8" }}>Operator</p>
          </div>
        </div>
      </motion.aside>

      {/* ── Main content ── */}
      <motion.div
        variants={panelVariants}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          background: "var(--color-surface, #F8FAFC)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "10px 16px",
            borderBottom: "1px solid var(--color-border, #E2E8F0)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            background: "var(--color-surface, #FFFFFF)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", color: "#94A3B8" }}>
            <span>Akademik</span>
            <span>›</span>
            <span style={{ color: "var(--color-primary, #6366F1)", fontWeight: 500 }}>Jadwal Pelajaran</span>
            <span>›</span>
            <span style={{ color: "var(--color-text-1, #0F172A)", fontWeight: 600 }}>Detail</span>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <button
              style={{
                padding: "4px 10px",
                fontSize: "10px",
                borderRadius: "7px",
                border: "1px solid var(--color-border, #E2E8F0)",
                background: "white",
                color: "#374151",
                fontWeight: 500,
                cursor: "default",
              }}
            >
              ▶ Generate Session
            </button>
            <button
              style={{
                padding: "4px 10px",
                fontSize: "10px",
                borderRadius: "7px",
                border: "1px solid #C7D2FE",
                background: "#EEF2FF",
                color: "#4F46E5",
                fontWeight: 600,
                cursor: "default",
              }}
            >
              ✏ Edit
            </button>
          </div>
        </div>

        {/* Class filter pills */}
        <div
          style={{
            padding: "10px 16px",
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            flexShrink: 0,
            borderBottom: "1px solid var(--color-border, #E2E8F0)",
            background: "var(--color-surface, #FFFFFF)",
          }}
        >
          {CLASSES.map((cls) => (
            <button
              key={cls}
              onMouseEnter={(e) => {
                if (cls !== activeClass) {
                  ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F1F5F9"
                }
              }}
              onMouseLeave={(e) => {
                if (cls !== activeClass) {
                  ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = "white"
                }
              }}
              style={{
                padding: "4px 12px",
                fontSize: "11px",
                borderRadius: "999px",
                border: cls === activeClass ? "none" : "1px solid #E2E8F0",
                background: cls === activeClass ? "#0F172A" : "white",
                color: cls === activeClass ? "white" : "#64748B",
                fontWeight: cls === activeClass ? 600 : 400,
                cursor: "default",
                transition: "background 150ms ease",
                boxShadow: cls === activeClass ? "0 1px 4px rgba(0,0,0,0.15)" : "0 1px 2px rgba(0,0,0,0.04)",
              }}
              onClick={() => setActiveClass(cls)}
            >
              {cls}
            </button>
          ))}
        </div>

        {/* Class title */}
        <div
          style={{
            padding: "12px 16px 6px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
          }}
        >
          <h4 style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-text-1, #0F172A)" }}>
            {activeClass}
          </h4>
          <span
            style={{
              fontSize: "10px",
              fontWeight: 600,
              padding: "2px 9px",
              borderRadius: "999px",
              background: "#DBEAFE",
              color: "#1D4ED8",
            }}
          >
            Pagi
          </span>
        </div>

        {/* Schedule table */}
        <div style={{ flex: 1, overflowY: "auto", overflowX: "auto", padding: "0 16px 16px" }}>
          <ScheduleTable selectedClass={activeClass} />
        </div>
      </motion.div>
    </motion.div>
  )
})
