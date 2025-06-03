const ContactLocation = () => {
    return (
      <div className="relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254507.62419871128!2d-0.2416814060054076!3d51.52855824164978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2suk!4v1715597594739!5m2!1sen!2suk"
          width="100%"
          height="524"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Our Location in London, UK"
        ></iframe>
      </div>
    );
};

export default ContactLocation;