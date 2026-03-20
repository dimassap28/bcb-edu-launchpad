import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { FAQ_ITEMS } from "@/entities/pricing/data/pricing.data";

export function PricingFAQ() {
  return (
    <section className="py-20 bg-section-alt">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="text-xs border rounded-full px-3 py-1 font-semibold text-muted-foreground uppercase tracking-wider">
              Pricing FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mt-4 mb-4">
              Frequently <em className="text-primary not-italic">asked</em> questions
            </h2>
            <p className="text-muted-foreground text-sm">See how our client school's have optimized their system by approximately 95%</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Accordion type="single" collapsible className="space-y-2">
              {FAQ_ITEMS.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
                  <AccordionTrigger className="text-left py-5 hover:no-underline">
                    <div className="flex items-center gap-4">
                      <span className="text-primary font-bold text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-semibold text-sm">{item.q}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-10 text-sm text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
