import { motion } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  Code 
} from "lucide-react";

const features = [
  {
    name: "Advanced AI Models",
    description: "Leverage state-of-the-art generative AI models trained on diverse datasets for optimal performance.",
    icon: Sparkles,
  },
  {
    name: "Lightning Fast",
    description: "Optimized for speed even on slower connections, ensuring a seamless user experience everywhere.",
    icon: Zap,
  },
  {
    name: "Secure by Design",
    description: "Enterprise-grade security with encryption at rest and in transit for all your sensitive data.",
    icon: Shield,
  },
  {
    name: "Cross-Platform",
    description: "Works flawlessly across iOS, Android, and web platforms with a consistent premium experience.",
    icon: Globe,
  },
  {
    name: "Mobile Optimized",
    description: "Responsive design that adapts to any screen size with native-like performance on mobile devices.",
    icon: Smartphone,
  },
  {
    name: "Developer Friendly",
    description: "Well-documented APIs and SDKs that make integration into your existing systems straightforward.",
    icon: Code,
  },
];

export default function FeatureSection() {
  return (
    <div className="py-16 bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            Capabilities
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-foreground sm:text-4xl">
            Premium AI Solutions For Every Need
          </p>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground lg:mx-auto">
            Discover how our generative AI capabilities can transform your business with cutting-edge technology and elegant implementation.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 bg-card rounded-lg border border-border overflow-hidden"
              >
                {/* Feature glow */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
                
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5">
                    <h3 className="text-lg font-medium text-foreground">
                      {feature.name}
                    </h3>
                    <p className="mt-2 text-base text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
