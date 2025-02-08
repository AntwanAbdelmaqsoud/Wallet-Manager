// src/components/ContactUs.tsx
import { Input } from "@/components/ui/input"; // shadcn input component
import { Textarea } from "@/components/ui/textarea"; // shadcn textarea component
import { Button } from "@/components/ui/button"; // shadcn button component

const ContactPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F6] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-dark-red">
            Contact Us
          </h2>
          <p className="mt-2 text-center text-zinc-600">
            We'd love to hear from you!
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-300 placeholder-zinc-500 text-zinc-900 rounded-t-md focus:outline-none focus:ring-dark-red focus:border-dark-red focus:z-10 sm:text-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-300 placeholder-zinc-500 text-zinc-900 focus:outline-none focus:ring-dark-red focus:border-dark-red focus:z-10 sm:text-sm"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-zinc-300 placeholder-zinc-500 text-zinc-900 rounded-b-md focus:outline-none focus:ring-dark-red focus:border-dark-red focus:z-10 sm:text-sm"
                placeholder="Your Message"
                rows={4}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-dark-red hover:bg-dark-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-red"
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ContactPage;
