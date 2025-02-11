import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black font-[inter] text-white p-4 text-center">
      <div className="container px-[4.5rem]">
        <div className="mt-[2rem] flex flex-col md:flex-row items-center justify-between gap-[1.5rem] py-[4rem]">
          <div className="flex flex-col items-center justify-center gap-[0.5rem]">
            <p>&copy; Elmanga Company.</p>
            <div className="flex items-center justify-center gap-[1rem]">
              <FaYoutube />
              <FaInstagram />
              <FaTiktok />
            </div>
            <p className="max-w-[10rem] font-light text-[1rem] leading-[1.7rem] text-center">
              Navigate the Markets, Secure Your Future.
            </p>
          </div>
          <div className="flex flex-col gap-[1.5rem] items-center justify-center font-[inter] font-normal text-[0.88rem] leading-[1.25rem] text-center">
            <h5>MAIN</h5>
            <h5>Home</h5>
            <h5>Services</h5>
            <h5>Blog</h5>
          </div>
          <div className="flex flex-col gap-[1.5rem] items-center justify-center font-[inter] font-normal text-[0.88rem] leading-[1.25rem] text-center">
            <h5>PAGES</h5>
            <h5>Contact</h5>
            <h5>Terms & Conditions</h5>
            <h5>Privacy Policy</h5>
          </div>
          <div className="flex flex-col gap-[1.5rem] items-center justify-center font-[inter] font-normal text-[0.88rem] leading-[1.25rem] text-center">
            <h5>UTILITIES</h5>
            <h5>Guide</h5>
            <h5>Instructions</h5>
            <h5>Licenses</h5>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
