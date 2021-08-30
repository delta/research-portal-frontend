import styled from "styled-components";

const Container = styled.div`
  height: 50vh;
  top: 75vh;
  width: 60vw;
  left: 20vw;
  box-shadow: 4px 0px 21px rgba(0, 0, 0, 0.25),
    -4px 4px 22px rgba(0, 0, 0, 0.25);
  border-radius: 32px;
  @media screen and (min-width: 768px) and (max-width: 991px) {
    width: 80vw;
    left: 10vw;
    border-radius: 24px;
  }
  @media screen and (max-width: 768px) {
    width: 90vw;
    left: 5vw;
    border-radius: 16px;
  }
`;

const Overview = () => {
  return (
    <Container className="h-full bg-gray-300 absolute lg:p-9 md:p-6 p-4 flex justify-around items-start flex-col">
      <p className=" xl:text-5xl lg:text-4xl md:text-3xl text-2xl text-gray-800 border-b-2 border-gray-400 pb-3 font-bold">
        About NIT Trichy
      </p>
      <p className="xl:text-xl lg:text-lg md:text-sm text-xs text-gray-700">
        The institution offers Under Graduate Courses in ten branches and Post
        Graduate Courses in twenty-one disciplines of Science, Engineering &
        Technology besides M.S. (by Research) and Ph.D. in all the departments.
        The faculty is inducted through a process of open advertisement
        throughout the country. The institute is an example of cultural unity
        with students drawn from most of the states in the country.
      </p>
    </Container>
  );
};

export default Overview;
