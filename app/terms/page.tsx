import { Container } from "@/components/site/container";

export default function TermsPage() {
  return (
    <Container className="py-12">
      <h1 className="text-3xl md:text-4xl font-extrabold">Terms of Service</h1>
      <p className="mt-4 text-sm text-ink/70 max-w-3xl">
        By using this website and booking a service, you agree to provide accurate information and
        respond promptly when confirmation is needed. Payment proof uploads are reviewed by admin
        before confirmation.
      </p>
    </Container>
  );
}