import { NextSeo } from "next-seo";
import { useState } from "react";
import H1 from "../components/H1";
import Image from "next/image";
import PageLayout from "../components/PageLayout";

export default function About() {
  const imgClass = "w-32 transition-opacity hover:opacity-70 sm:w-24";
  const liClass = "p-10 sm:p-5";

  const [formData, setFormData] = useState({});
  const [formSubmitFeedback, setFormSubmitFeedback] = useState({});

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const sendEmail = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
    .then((res) => res.json())
    .catch((err) => {
      console.error(`FAILED TO SEND MESSAGE! ${err}`);
    });

    setFormSubmitFeedback({
      message: response? response.message : "Unable to Send Message.",
      sent: response?.sent,
    });
    setFormData({});
  };

  return (
    <>
      <NextSeo
        title="Contact"
        description="Where to reach me."
        openGraph={{ url: "https://kevinruffe.com/contact" }}
      />
      <PageLayout>
        <div className="text-center pt-32">
          <H1>Say Hello</H1>
          <form onSubmit={sendEmail}>
            {formSubmitFeedback.message && (
              <div>{formSubmitFeedback.message}</div>
            )}
            <label>Your Name:{"  "}
              <input type="text"
                     name="name"
                     value={formData.name ?? ""}
                     onChange={handleFormChange}
                     required />
            </label>
            <label>Your Email:{"  "}
              <input type="email"
                     name="email"
                     value={formData.email ?? ""}
                     onChange={handleFormChange}
                     required />
            </label>
            <label>Message:{"  "}
              <textarea rows="5"
                        cols="35"
                        name="message"
                        value={formData.message ?? ""}
                        onChange={handleFormChange}
                        required />
            </label>
            <input type="text"
                   name="phone"
                   className="hidden"
                   value={formData.phone ?? ""}
                   onChange={handleFormChange} />
            <button type="submit">Send Message</button>
          </form>
          <h2>Or find me here!</h2>
          <address>
            <ul className="flex items-center justify-center">
              <li className={liClass}>
                <a href="https://www.instagram.com/kevinjruffe/">
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    width={128}
                    height={128}
                    className={imgClass}
                  />
                </a>
              </li>
              <li className={liClass}>
                <a href="https://github.com/kevinjruffe">
                  <Image
                    src="/github.png"
                    alt="GitHub"
                    width={128}
                    height={125}
                    className={imgClass}
                  />
                </a>
              </li>
            </ul>
          </address>
        </div>
      </PageLayout>
    </>
  );
}
