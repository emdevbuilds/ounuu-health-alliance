import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { members } from "@/lib/members";
import { MoveUpRight } from "lucide-react";

const page = () => {
  return (
    <main className="bg-green-50/30 padding">
      <div className="flex flex-col gap-x-y pt-12 md:pt-16">
        <h2 className="text-center text-green-800 font-bold pb-2 md:text-3xl md:pb-6">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-y items-start">
          {members.map((member) => (
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
                      href={`team/${member.slug}`}
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
      </div>
    </main>
  );
};

export default page;
