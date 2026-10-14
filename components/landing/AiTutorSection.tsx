import { MessageCircle, ClipboardCheck } from "lucide-react";
import Container from "./ui/Container";
import Button from "./ui/Button";
import { heading2, sectionPadding } from "./ui/typography";

const PREVIEWS = [
  {
    icon: MessageCircle,
    caption: "Ask a question and get an explanation from the courseware.",
  },
  {
    icon: ClipboardCheck,
    caption: "Get a specific explanation of what you got wrong, and what to review next.",
  },
];

export default function AiTutorSection() {
  return (
    <section className={`bg-white text-black ${sectionPadding}`}>
      <Container>
        <h2 className={`${heading2} mb-4`}>An AI tutor goes live in November.</h2>
        <p className="text-iron-gray max-w-2xl mb-16">
          It will help you work through the lectures.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {PREVIEWS.map(({ icon: Icon, caption }) => (
            <div key={caption} className="flex flex-col gap-3">
              <div className="w-full aspect-video bg-gray-light border border-steel-gray flex items-center justify-center">
                <Icon className="text-primary" size={40} />
              </div>
              <p className="text-sm text-iron-gray italic">{caption}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary text-white p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <p className="max-w-xl">
            The AI tutor goes live in November. Join the waitlist to hear when it launches.
          </p>
          <Button href="#" variant="outlineInverse" className="shrink-0">
            Get early access →
          </Button>
        </div>
      </Container>
    </section>
  );
}
