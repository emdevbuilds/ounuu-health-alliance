"use client";

import { Ambulance, HeartHandshake, HeartPlus, Megaphone } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProgramCarousel = () => {
  return (
    <section>
      <div className="grid grid-cols-1 gap-y-6 lg:hidden">
        <Card className="w-full shadow-lg">
          <CardHeader className="">
            <CardTitle className="text-xl font-bold text-green-800 text-center">
              <div className="flex items-center justify-center pb-4">
                <Ambulance size={40} />
              </div>
              Emergency Relief
            </CardTitle>
          </CardHeader>

          <CardContent className="text-primary leading text-base text-center">
            In times of crisis, we mobilize quickly to deliver aid, medical
            support, and shelter to affected communities.
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg">
          <CardHeader className="">
            <CardTitle className="text-xl font-bold text-green-800 text-center">
              <div className="flex items-center justify-center pb-4">
                <HeartHandshake size={40} />
              </div>
              Community Support
            </CardTitle>
          </CardHeader>

          <CardContent className="text-primary leading text-base text-center">
            From food distribution to mental health workshops, we support
            communities with resources that foster dignity and resilience.
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg">
          <CardHeader className="">
            <CardTitle className="text-xl font-bold text-green-800 text-center">
              <div className="flex items-center justify-center pb-4">
                <HeartPlus size={40} />
              </div>
              Health Optimization
            </CardTitle>
          </CardHeader>

          <CardContent className="text-primary leading text-base text-center">
            We provide preventive care, medical outreach, and wellness education
            to underserved populations.
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg">
          <CardHeader className="">
            <CardTitle className="text-xl font-bold text-green-800 text-center">
              <div className="flex items-center justify-center pb-4">
                <Megaphone size={40} />
              </div>
              Indigent Outreach
            </CardTitle>
          </CardHeader>

          <CardContent className="text-primary leading text-base text-center">
            Focused aid for orphans, widows, displaced persons—ensuring they
            receive the care, and opportunities they deserve.
          </CardContent>
        </Card>
      </div>

      {/* for large screen */}
      <div className="hidden lg:block">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            <CarouselItem className="basis-1/2">
              <div className="p-2">
                <Card className="w-full">
                  <CardHeader className="">
                    <CardTitle className="text-xl font-bold text-green-800 text-center">
                      <div className="flex items-center justify-center pb-4">
                        <Ambulance size={40} />
                      </div>
                      Emergency Relief
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-primary leading text-base text-center">
                    In times of crisis, we mobilize quickly to deliver aid,
                    medical support, and shelter to affected communities.
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            <CarouselItem className="basis-1/2">
              <div className="p-2">
                <Card className="w-full">
                  <CardHeader className="">
                    <CardTitle className="text-xl font-bold text-green-800 text-center">
                      <div className="flex items-center justify-center pb-4">
                        <HeartHandshake size={40} />
                      </div>
                      Community Support
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-primary leading text-base text-center">
                    From food distribution to mental health workshops, we
                    support communities with resources that foster dignity and
                    resilience.
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            <CarouselItem className="basis-1/2">
              <div className="p-2">
                <Card className="w-full">
                  <CardHeader className="">
                    <CardTitle className="text-xl font-bold text-green-800 text-center">
                      <div className="flex items-center justify-center pb-4">
                        <HeartPlus size={40} />
                      </div>
                      Health Optimization
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-primary leading text-base text-center">
                    We provide preventive care, medical outreach, and wellness
                    education to underserved populations.
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>

            <CarouselItem className="basis-1/2">
              <div className="p-2">
                <Card className="w-full">
                  <CardHeader className="">
                    <CardTitle className="text-xl font-bold text-green-800 text-center">
                      <div className="flex items-center justify-center pb-4">
                        <Megaphone size={40} />
                      </div>
                      Indigent Outreach
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-primary leading text-base text-center">
                    Focused aid for orphans, widows, displaced persons—ensuring
                    they receive the care, and opportunities they deserve.
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="-left-8" />
          <CarouselNext className="-right-8" />
        </Carousel>
      </div>
    </section>
  );
};

export default ProgramCarousel;
