import Separator from "@/components/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleHelp } from "lucide-react";

export default function FAQ() {
  const accordionItems = [
    {
      trigger: "Can I get COVID-19 from the air, water, or soil around a WWTP?",
      content: "We have no evidence that the virus is viable as it travels through sewage systems.",
    },
    {
      trigger: "Can I get COVID-19 from my municipal drinking water?",
      content:
        "No. Drinking water is treated to remove pathogens including the virus that causes COVID-19.",
    },
    {
      trigger:
        "Will my community be shut down or have a stay-at-home order issued because of these data?",
      content:
        "No. This data alone will not drive a stay-at-home order. Rather, we hope this is a tool for communities to use along with other resources to help protect their citizens.",
    },
    {
      trigger: "Can SNHD tell where in the community the virus is coming from?",
      content:
        "No. This test looks at the sewer system as a whole, so it is impossible to pinpoint where in a community the virus is coming from.",
    },
  ];

  return (
    <main className="flex flex-col items-center gap-y-16 pt-16">
      <section className="w-[80%] flex flex-col items-center gap-y-16">
        <Separator title="Frequently Asked Questions" />
        <div className="w-[70%] min-w-[325px]">
          <Accordion type="multiple">
            {accordionItems.map((item, id) => (
              <>
                <AccordionItem value={id.toString()}>
                  <AccordionTrigger>
                    {
                      <div className="flex flex-row items-center gap-x-2">
                        {/* wrapping icon in a div because it shrinks on window resize for some reason */}
                        <div>
                          <CircleHelp />
                        </div>
                        <p>{item.trigger}</p>
                      </div>
                    }
                  </AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              </>
            ))}
          </Accordion>
        </div>
      </section>
      <section className="w-[80%] flex flex-col gap-y-16">
        <Separator title="What does this mean for my community?" />
        <div className="flex flex-col gap-y-4">
          <p>
            Sewershed monitoring can serve as an early indicator of COVID-19 infection in
            communities. As trends in the data are identified, SNHD works with communities and local
            public health authorities to determine appropriate actions to protect public health.
          </p>
          <p>
            These data provide information, that may allow for rapid implementation of protective
            measures to help slow the spread of the disease.
          </p>
          <p>
            Guidance on how to protect yourself and others from COVID-19 is available on the{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://covid.southernnevadahealthdistrict.org/"
            >
              SNHD
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://archive.cdc.gov/#/details?url=https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html"
            >
              CDC
            </a>{" "}
            websites.
          </p>
        </div>
      </section>
    </main>
  );
}
