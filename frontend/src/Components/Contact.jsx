import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import './Contact.css';

const Contact = () => {
  const form = useRef();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const validateForm = (name, email, message) => {
    const newErrors = {};

    if (!/^[A-Za-z ]+$/.test(name)) {
      newErrors.name =
        "Name should contain only letters and spaces";
    }

    if (name.trim().length < 3) {
      newErrors.name =
        "Name must be at least 3 characters";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email =
        "Please enter a valid email address";
    }

    if (message.trim().length < 15) {
      newErrors.message =
        "Message must be at least 15 characters";
    }

    return newErrors;
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const validationErrors = validateForm(
      name,
      email,
      message
    );

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);

      setStatus({
        type: "error",
        text: "Please fix the highlighted fields.",
      });

      return;
    }

    setErrors({});
    setStatus(null);
    setLoading(true);

    try {
      await emailjs.sendForm(
        "service_s1rbmqp",
        "template_b3f5shs",
        form.current,
        "2_nEHkDgBK5IguBny"
      );

      setStatus({
        type: "success",
        text:
          "Thank you for reaching out. Your message has been delivered successfully.",
      });

      form.current.reset();
    } catch (error) {
      console.error(error);

      setStatus({
        type: "error",
        text:
          "Unable to send your message right now. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="contact-section"
    >
      <div className="contact-container">
        <h2 className="section-title">
          Get In Touch
        </h2>

        <p className="section-description">
          Have a project in mind or just want
          to say hello? Feel free to reach
          out.
        </p>

        <form
          ref={form}
          className="contact-form"
          onSubmit={sendEmail}
          noValidate
        >
          <div className="input-group">
            <input
              className={`form-input ${
                errors.name ? "input-error" : ""
              }`}
              type="text"
              name="name"
              placeholder="Your Name"
            />

            {errors.name && (
              <span className="field-error">
                {errors.name}
              </span>
            )}
          </div>

          <div className="input-group">
            <input
              className={`form-input ${
                errors.email
                  ? "input-error"
                  : ""
              }`}
              type="email"
              name="email"
              placeholder="Your Email"
            />

            {errors.email && (
              <span className="field-error">
                {errors.email}
              </span>
            )}
          </div>

          <div className="input-group">
            <textarea
              className={`form-textarea ${
                errors.message
                  ? "input-error"
                  : ""
              }`}
              name="message"
              rows="6"
              placeholder="Tell me about your project..."
            />

            {errors.message && (
              <span className="field-error">
                {errors.message}
              </span>
            )}
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Sending Message..."
              : "Send Message"}
          </button>

          {status && (
            <div
              className={`form-status ${status.type}`}
            >
              <div className="status-icon">
                {status.type === "success"
                  ? "✓"
                  : "!"}
              </div>

              <div className="status-content">
                <h4>
                  {status.type === "success"
                    ? "Message Delivered"
                    : "Validation Error"}
                </h4>

                <p>{status.text}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;