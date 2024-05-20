import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Help = () => {
  return (
    <div className="flex flex-col items-center w-[1300px]">
      <div className="items-center justify-center py-20">
        <h1 className="text-5xl text-Black font-bold text-center">Pertanyaan yang Sering</h1>
        <h1 className="text-4xl text-[#5d87ff] font-bold text-center py-5 mb-5">Diajukan</h1>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Bagaimana cara memantau kondisi pasien secara real-time?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Bagaimana cara melihat notifikasi?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Bagaimana cara menambahkan notes?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Bagaimana cara sorting perawatan pasien?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
export default Help;
