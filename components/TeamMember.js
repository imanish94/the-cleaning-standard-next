import Image from "next/image";
import TeamCard from "./cards/TeamCard";

const teamData = [
  {
    id: 1,
    teamThumb: "/images/team-thumb5.png",
    teamTitle: "House Cleaner",
    teamDesc: "Anjelina Watson",
  },
  {
    id: 2,
    teamThumb: "/images/team-thumb6.png",
    teamTitle: "Office Cleaner",
    teamDesc: "David Miller",
  },
  {
    id: 3,
    teamThumb: "/images/team-thumb7.png",
    teamTitle: "Room Cleaner",
    teamDesc: "Annee Marie",
  },
  {
    id: 4,
    teamThumb: "/images/team-thumb8.png",
    teamTitle: "Floor Cleaner",
    teamDesc: "Ricard Powel",
  },
];

const TeamMember = () => {
  return (
    <section className="bg-[#f3f4f8] py-16 sm:py-20 lg:py-28">
      <div className="Container">
        <div className="text-center">
          <h5 className="font-Inter inline-block text-lg text-SecondaryColor-0 font-medium px-9 relative before:absolute before:top-1/2 before:left-0 before:w-6 before:h-3 before:bg-[url(/images/cleaning-shapes.png)] before:bg-no-repeat before:bg-[inherit] before:-translate-y-1/2 after:absolute after:top-1/2 after:right-0 after:w-6 after:h-3 after:bg-[url(/images/cleaning-shapes.png)] after:bg-no-repeat after:bg-[inherit] after:-translate-y-1/2">
            EXPERT TEAM
          </h5>
          <h1 className="font-Inter font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[44px] xl:leading-[54px] 2xl:text-[50px] 2xl:leading-[66px] text-HeadingColor-0 mt-3 mb-4">
            Our Working <span className="text-PrimaryColor-0"> Experts</span>
          </h1>
          <p className="font-Poppins text-TextColor-0 font-light mb-10 sm:mb-14">
            Services we partners you as soon as possible your home or office
            Just
            <br className="hidden md:block" /> Feel Free contact us based web
            develop Expert.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 mt-8 sm:mt-12">
          {teamData.map(
            ({
              id,
              teamThumb,
              teamTitle,
              teamDesc,
            }) => (
              <div key={id}>
                <TeamCard
                  teamThumb={teamThumb}
                  teamTitle={teamTitle}
                  teamDesc={teamDesc}
                />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamMember;
