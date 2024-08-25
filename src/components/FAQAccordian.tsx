import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { accordianData } from "../utils/accordianData"

export function FAQAccordian() {
  return (
    <div>
      <div className=" py-2 lg:pb-10 lg:px-4 px-2">
        <h1 className=" w-full lg:w-1/2 text-center  mx-auto text-5xl font-bold text-black">
          Frequently Asked Questions
        </h1>
      </div>
      <div className=" w-full lg:w-[90%]  mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {accordianData.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={item.question}>
              <AccordionTrigger className=" text-[1.2rem] text-start px-4 font-semibold text-gray-900">{item.question}</AccordionTrigger>
              <AccordionContent className=" text-base text-gray-800 px-4 font-semibold text-start">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}