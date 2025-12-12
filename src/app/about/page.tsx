import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { members } from "@/lib/members";
import { HeartHandshake, MoveUpRight, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <main className="padding">
      <div className="flex flex-col gap-x-y pt-12 md:pt-16">
        {/* <h2 className="text-green-800 font-bold pb-4 text-center">
          About OUNUU Health Alliance
        </h2> */}
        <div className="flex flex-col gap-x-y lg:flex-row">
          <div className="flex flex-col gap-y-8 pb-8 lg:w-1/2">
            <h2 className="font-semibold text-green-800 md:text-3xl">
              <span className="border-l-4 border-green-800 pl-3">
                Who We Are
              </span>
            </h2>
            <div>
              <p className="leading text-base text-primary md:text-lg">
                OUNUU Health Alliance is the healthcare arm of{" "}
                <strong>Obiumunna Na Umuada United.</strong> It was created to
                address the urgent health needs of underserved communities,
                focusing on preventive care, emergency relief, and support for
                indigent groups.
              </p>
              <p className="leading text-base pt-4 text-primary md:text-lg">
                We believe that access to healthcare is a human right — not a
                privilege — and we are committed to bridging the gap for those
                who need it
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <Image alt="Logo" src="/logo.svg" height={500} width={500} />
          </div>
        </div>

        <div className="flex flex-col gap-y-8 pt-8">
          <h2 className="font-semibold text-green-800 md:text-3xl">
            <span className="border-l-4 border-green-800 pl-3">
              Our Founder
            </span>
          </h2>
          <div>
            <p className="leading text-base text-primary md:text-lg">
              <strong>Obiumunna Na Umuada United</strong> was founded by{" "}
              <strong>
                {" "}
                <Link
                  href="https://obiumunnanaumuadaunited.com/2024/05/21/prfile-mazi-godwin-e-chukwu-founder-president-trustees-member/"
                  target="_blank"
                >
                  Mazi Godwin E. Chukwu,{" "}
                </Link>{" "}
              </strong>
              a visionary leader and passionate advocate for community
              empowerment. His commitment to equity, compassion, and service
              laid the foundation for our mission to uplift vulnerable
              populations and transform lives across Nigeria.
            </p>
            <p className="leading text-base pt-4 text-primary md:text-lg">
              Through his leadership, the organization launched{" "}
              <strong>OUNUU Health Alliance</strong> — a dedicated initiative
              focused on improving health outcomes and delivering care to
              underserved communities.
            </p>
          </div>
        </div>

        <div className="grid gird-cols-1 gap-x-14 gap-y-8 lg:grid-cols-3 lg:pt-4">
          <div className="space-y-3 lg:space-y-4 lg:order-2">
            <h3 className="font-semibold text-green-800">Our Mission</h3>
            <p className="text-base leading-7">
              To serve humanity through health optimization, community support,
              and alleviating the ordeal of indigent groups.
            </p>
          </div>
          <div className="space-y-3 lg:space-y-4 lg:order-3">
            <h3 className="font-semibold text-green-800">Our Vison</h3>
            <p className="text-base leading-7">
              Transforming lives and communities through accessible healthcare
              and holistic services.
            </p>
          </div>
          <div className="space-y-3 lg:space-y-4 lg:order-1">
            <h3 className="font-semibold text-green-800">Our Core Values</h3>
            <ul className="list-decimal list-inside space-y-4 leading-7">
              <li>
                <strong>Empathy</strong> – We listen with heart
              </li>
              <li>
                <strong>Compassion</strong> – We act with kindness
              </li>
              <li>
                <strong>Equity</strong> – We stand for fairness
              </li>
              <li>
                <strong>Excellence</strong> – We strive for impact
              </li>
              <li>
                <strong>Service</strong> – We serve holistically
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 pt-8">
          <h2 className="font-semibold text-green-800 md:text-3xl">
            <span className="border-l-4 border-green-800 pl-3">
              Our Leadership
            </span>
          </h2>
          <div>
            <p className="leading text-base text-primary md:text-lg">
              Our Board of Trustees and leadership team guide our mission with
              integrity, compassion, and a deep commitment to community health.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-x-y">
          <h2 className="font-bold text-green-800 pb-3 text-center md:text-3xl">
            Meet the Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-y items-start">
            {members.slice(0, 3).map((member) => (
              <div key={member.slug}>
                <Card className="flex flex-col bg-green-50/40 border-green-50 border-2 w-full shadow-lg">
                  <CardContent className="mt-0">
                    <div className="flex justify-center items-center">
                      <Image
                        alt={`${member.name} picture`}
                        className="rounded-full border-3 border-green-500 p-3"
                        src={member.picture}
                        width={250}
                        height={250}
                      />
                    </div>
                  </CardContent>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-green-800 leading-8 py-3 text-center">
                      {member.name}
                    </CardTitle>
                    <CardDescription className="font-semibold text-base text-primary leading-7 py-3 text-center">
                      {member.role}
                    </CardDescription>
                    <Button
                      asChild
                      className="bg-green-700 text-white hover:bg-green-800 my-3"
                      size="lg"
                    >
                      <Link
                        href={`/team/${member.slug}`}
                        className="flex-row items-center text-primary"
                      >
                        <span>View profile</span>
                        <MoveUpRight className="!w-5 !h-5" />
                      </Link>
                    </Button>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <Button
              asChild
              className="bg-transparent border-2 border-green-800 text-primary hover:text-white hover:bg-green-800 my-3"
              size="lg"
            >
              <Link href="/team" className="flex-row items-center text-primary">
                <span>Meet the Full Team</span>
                <MoveUpRight className="!w-5 !h-5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-y-8 pt-8">
          <h2 className="font-semibold text-green-800 md:text-3xl">
            <span className="border-l-4 border-green-800 pl-3">
              Get Involved
            </span>
          </h2>
          <div>
            <p className="leading text-base text-primary md:text-lg">
              Whether you’re looking to volunteer, donate, or partner with us,
              there’s a place for you at OUNUU Health Alliance.
            </p>
          </div>
          <div className="flex flex-row gap-x-6 lg:gap-x-12">
            <div className="relative flex items-center justify-center !p-0">
              <Button
                asChild
                className="text-primary shadow-lg border-2 border-green-700 bg-transparent hover:text-white hover:bg-green-800"
                size="lg"
              >
                <Link
                  href="/volunteer"
                  className="flex-row items-center text-black"
                >
                  <span>Join Us</span>
                  <Users className="!w-5 !h-5" />
                </Link>
              </Button>
            </div>
            <div className="relative flex items-center !p-0">
              <Button
                asChild
                className="bg-green-700 text-green-900 hover:bg-green-800 shadow-lg"
                size="lg"
              >
                <Link
                  href="/donationon"
                  className="flex-row items-center text-white"
                >
                  <span>Donate Now</span>
                  <HeartHandshake className="text-white !w-5 !h-5" />
                </Link>
              </Button>
              <span className="absolute top-0 -right-1 w-[10px] h-[10px] animate-ping rounded-full bg-green-500 opacity-85"></span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
