import { notFound } from "next/navigation";
import Image from "next/image";
import { members } from "@/lib/members";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Phone } from "lucide-react";

async function getTeamBySlug(slug: string) {
  const member = members.find((member) => member.slug == slug);

  if (!member) notFound();

  return { member };
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const team_info = await getTeamBySlug(slug);

  return (
    <main className="bg-green-50/30 padding-x pt-16 pb-22 md:pt-20 lg:pb-28">
      <div className="flex flex-col justify-center items-center gap-x-y lg:flex-row">
        <div className="lg:w-1/2">
          <Image
            alt={`${team_info.member.name} picture`}
            className="rounded-lg"
            src={team_info.member.picture}
            height={570}
            width={570}
          />
          <div className="text-green-800/80 flex flex-col pt-6 gap-y-6 md:flex-row md:justify-between">
            <div className="flex lg:justify-center items-center">
              <Mail />
              <p className="pl-2 text-base">{team_info.member.contact.email}</p>
            </div>
            <div className="flex lg:justify-center items-center">
              <Phone />
              <p className="pl-2 text-base">{team_info.member.contact.phone}</p>
            </div>
          </div>
          <hr className="mt-6" />
          <div className="hidden lg:flex lg:flex-col">
            <h3 className="font-bold text-green-800 py-4">Work Experience</h3>
            <div className="flex py-3">
              <ul className="list-decimal list-inside space-y-3 leading-7">
                {team_info.member.workExperience.map((work, index) => (
                  <li key={index}>{work}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="pb-4 text-base text-green-700 font-bold">
            {team_info.member.role}
          </div>
          <h2 className="text-green-800 font-bold md:text-3xl pb-6">
            {team_info.member.title}. {team_info.member.name}
          </h2>
          <p className="text-primary leading-7 py-3">
            {team_info.member.intro}
          </p>
          <p className="text-primary leading-7 py-3">
            {team_info.member.biography}
          </p>
          <div className="lg:hidden">
            <h3 className="font-bold text-green-800 py-4">Work Experience</h3>
            <div className="flex py-3">
              <ul className="list-decimal list-inside space-y-3 leading-7">
                {team_info.member.workExperience.map((work, index) => (
                  <li key={index}>{work}</li>
                ))}
              </ul>
            </div>
          </div>

          <h3 className="font-bold text-green-800 py-4">Education</h3>
          <div className="grid py-3">
            <Table className="">
              <TableHeader>
                <TableRow className="bg-green-50/40 hover:bg-green-50/40">
                  <TableHead className="font-semibold text-lg text-green-700">
                    School
                  </TableHead>
                  <TableHead className="font-semibold text-lg text-green-700">
                    Qualification
                  </TableHead>
                  <TableHead className="font-semibold text-lg text-green-700">
                    Year
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {team_info.member.education.map((education) => (
                  <TableRow
                    className="hover:bg-green-50/40"
                    key={`${education.school}-${education.qualification}`}
                  >
                    <TableCell>{education.school}</TableCell>
                    <TableCell>{education.qualification}</TableCell>
                    <TableCell>{education.year}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
