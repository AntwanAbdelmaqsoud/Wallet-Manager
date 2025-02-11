const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-red">About Us</h2>
          <p className="mt-2 text-zinc-600">
            Learn more about our mission, vision, and the team behind our
            success.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-black">Our Story</h3>
          <p className="mt-4 text-zinc-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-black">Our Mission</h3>
          <p className="mt-4 text-zinc-600">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>

        {/* Team Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-black">Meet the Team</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Team Member 1 */}
            <div className="bg-zinc-100 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-black">John Doe</h4>
              <p className="mt-2 text-zinc-600">CEO & Founder</p>
              <p className="mt-2 text-zinc-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="bg-zinc-100 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-black">Jane Smith</h4>
              <p className="mt-2 text-zinc-600">Lead Designer</p>
              <p className="mt-2 text-zinc-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
