import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    quote:
      "NexaTech transformed our outdated systems into a modern, scalable platform. Their expertise and dedication exceeded our expectations. The ROI we've seen has been phenomenal.",
    author: "Sarah Chen",
    role: "CTO",
    company: "RetailMax",
    initials: "SC",
  },
  {
    id: 2,
    quote:
      "The team delivered our mobile app ahead of schedule with incredible attention to detail. Our user engagement increased by 200% within the first month of launch.",
    author: "Michael Torres",
    role: "Product Director",
    company: "DataFlow Inc",
    initials: "MT",
  },
  {
    id: 3,
    quote:
      "Working with NexaTech was a game-changer. Their SEO expertise helped us achieve top rankings and significantly boosted our organic traffic by 340%.",
    author: "Emily Rodriguez",
    role: "Marketing VP",
    company: "GrowthLabs",
    initials: "ER",
  },
  {
    id: 4,
    quote:
      "From concept to deployment, NexaTech handled every aspect of our cloud migration flawlessly. Their team's technical knowledge and professionalism are unmatched.",
    author: "David Kim",
    role: "IT Director",
    company: "HealthFirst",
    initials: "DK",
  },
  {
    id: 5,
    quote:
      "The lead generation system NexaTech built for us has completely transformed our sales pipeline. We're now closing 50% more deals with better qualified leads.",
    author: "Amanda Foster",
    role: "Sales Director",
    company: "TechVentures",
    initials: "AF",
  },
  {
    id: 6,
    quote:
      "Exceptional work on our e-commerce platform. The site performance improved dramatically and our conversion rate doubled. Highly recommend their services.",
    author: "James Wilson",
    role: "CEO",
    company: "ShopEase",
    initials: "JW",
  },
];

export function Testimonials() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const autoplayPlugin = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [autoplayPlugin]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    if (autoplay.isPlaying()) {
      autoplay.stop();
      setIsPlaying(false);
    } else {
      autoplay.play();
      setIsPlaying(true);
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="about" className="py-20 md:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mt-4 mb-6">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Don't just take our word for it. Here's what our partners have to
            say about working with us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
                >
                  <Card
                    className="p-8 h-full border-border/50 mx-2"
                    data-testid={`card-testimonial-${testimonial.id}`}
                  >
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <blockquote className="text-foreground leading-relaxed mb-6 min-h-[120px]">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              className="rounded-full"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous testimonial</span>
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "bg-primary w-6"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              className="rounded-full"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next testimonial</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleAutoplay}
              className="rounded-full ml-2"
              data-testid="button-testimonial-autoplay"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              <span className="sr-only">
                {isPlaying ? "Pause autoplay" : "Play autoplay"}
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
