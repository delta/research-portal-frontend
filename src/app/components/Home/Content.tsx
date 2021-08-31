const Content = () => {
  return (
    <div
      className="w-screen bg-red-800 grid md:grid-cols-3 grid-cols-1"
      style={{ marginTop: "30vh", minHeight: "85vh", paddingTop: "10vh" }}
    >
      <div className=" w-full md:col-span-2 col-span-1 lg:p-14 md:p-8 p-6 flex justify-center items-start flex-col">
        <p className="xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-red-100 border-b-2 border-gray-100 pb-3 font-bold">
          Research and Consultancy
        </p>
        <p className="xl:text-xl lg:text-lg md:text-sm text-xs text-gray-100 mt-12">
          NIT-T strives its best to position itself at the forefront of
          cutting-edge research in pace with global standards. Research
          activities at NIT-T have been growing in all metrics with respect to
          the quantity and quality of researchers. There are several sponsored
          projects currently funded by MHRD, DST, SERB, CSIR, DRDO, ISRO, GTRE,
          AICTE, RGNIYD, DEITY, DAE. In addition to this, major consultancy
          projects with agencies like BHEL, CPW, PWD, Airport Authority of
          India, NLCL, CDAC are also undertaken across different departments of
          the Institute. The scholarly output of the institute per year is on an
          average of 700 publications and 10000 citations. In addition to this,
          the research community of the institute actively engages in
          translating novel ideas to a product/process and has several published
          and granted patents to its credit. In this spirit, the office of Dean
          (R&C) has been set up to dedicatedly accelerate the research
          activities in the campus. The Office of R&C meticulously works in
          improvising the interaction of the institute with other academic and
          Industrial agencies through different MoUs. Currently, there are MoUs
          signed between NIT-T and some of the leading educational institutes,
          Government and private R&D units, Industries. It has also excelled in
          facilitating the activities of incubating young entrepreneurs through
          CEDI, guidance to researchers in filing patents through IPR cell. This
          office is now working on establishing a centralized sophisticated
          instrumentation facility (SIF) to regulate the access of research
          facilities available at NIT-T to all internal & external researchers.
          Apart from these activities, the Office of Dean (R&C) offers
          managerial support and guidance to all research & consultancy
          activities on the campus and maintains complete records of Sponsored,
          Consultancy and Institute Projects, workshops organized, etc.
        </p>
      </div>
      <div className=" w-full md:col-span-1 col-span-1 flex justify-center items-center pr-10 md:mb-0 mb-6">
        <img
          src={
            "https://www.nitt.edu/home/academics/departments/physics/Faculty/ashok/research/group.jpg"
          }
          alt="dummy"
          className="md:h-1/2 h-full rounded-md pl-10 md:pl-0"
        />
      </div>
    </div>
  );
};

export default Content;
