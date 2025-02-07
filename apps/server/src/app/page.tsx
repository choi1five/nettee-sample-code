import ReactSwagger from '@/components/react-swagger';
import { getApiDocs } from '@/lib/swagger';

export default async function DocsPage() {
  const spec = await getApiDocs();
  return (
    <section>
      <ReactSwagger spec={spec} />
    </section>
  );
}
