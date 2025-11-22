export default function Contact() {
  return (
    <div className="contact-page flex flex-col min-h-screen">
      {/* Contact Section */}
      <div className="contact-section flex flex-col md:flex-row gap-6 p-4 flex-1">
        {/* Map */}
        <div className="map flex-1 min-w-[300px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24185.797799278695!2d-73.8933871!3d40.7350804!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25e4de04823f7%3A0x22ab16c4f64f0faa!2sSushi%20Island!5e0!3m2!1sen!2sus!4v1759291829438!5m2!1sen!2sus"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sushi Island Location"
          ></iframe>
        </div>

        {/* Contact Description + Form */}
        <div className="contact-description flex-1 bg-gray-50 p-6 rounded border">
          <h1 className="text-2xl font-bold mb-2">Contact Us</h1>
          <p className="mb-2">
            Feel free to reach out to us for any inquiries or reservations!
          </p>
          <p className="mb-4">
            718-803-3033 <br />
            87-18 Queens Blvd, Elmhurst, New York 11373
          </p>

          <form className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Your Name"
                required
                className="p-2 border rounded"
            />
            <input
                type="email"
                placeholder="Your Email"
                required
                className="p-2 border rounded"
            />
            <textarea
                placeholder="Your Message"
                required
                className="p-2 border rounded resize-none"
                rows={3} 
            ></textarea>
            <button
                type="submit"
                className="bg-rose-800 text-white py-2 rounded hover:bg-rose-900 transition-colors"
            >
                Send
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
