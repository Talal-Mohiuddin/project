import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { MessageSquare, Globe, BookOpen, Lock } from "lucide-react";
import Separater from "./Separater";

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    description: "Control applications with simple text commands.",
  },
  {
    icon: Globe,
    title: "Universal Compatibility",
    description: "Works with a wide range of applications and APIs.",
  },
  {
    icon: BookOpen,
    title: "Custom Function Library",
    description: "Create and share custom functions with the community.",
  },
  {
    icon: Lock,
    title: "Secure Execution",
    description: "Run code in isolated environments for maximum security.",
  },
];

export default function Features() {
  return (
    <section className=" text-white py-16 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-blue-400 font-semibold tracking-wide uppercase mb-2 text-xl">
            FEATURES
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-4">
            Discover the Tools that Drive Success
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Unleash innovation and accelerate growth with our dynamic product.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 justify-center ">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-gray-800 border-gray-700 max-w-[300px] hover:border-purple-500 transition-colors duration-300"
            >
              <CardHeader>
                <feature.icon className="w-12 h-12 text-purple-500 mb-4" />
                <h4 className="text-xl font-semibold text-white">
                  {feature.title}
                </h4>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
