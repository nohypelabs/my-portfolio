import { ServicesContent } from './ServicesContent';
import { services, packages, steps, faqs } from '@/lib/data/services';

export default function ServicesPage() {
  return (
    <ServicesContent
      services={services}
      packages={packages}
      steps={steps}
      faqs={faqs}
    />
  );
}
