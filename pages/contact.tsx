import type { ContactFormData } from "../types/contactFormData";
import type { JSONResponse } from "../types/jsonResponse";
import type { NextApiResponse } from "next";

import { NextSeo } from "next-seo";
import { useState } from "react";
import H1 from "../components/H1";
import Image from "next/image";
import PageLayout from "../components/PageLayout";

const emptyFeedback: JSONResponse = {
  sent: false,
  message: "",
};

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  message: "",
  phone: "",
};

export default function About() {
  const [formData, setFormData] = useState<ContactFormData>(emptyForm);
  const [formSubmitFeedback, setFormSubmitFeedback] =
    useState<JSONResponse>(emptyFeedback);

  const focusStyle = "focus:ring focus:outline-green focus:rounded-sm";
  const buttonClass =
    "border border-black border-solid bg-green-light " +
    "rounded-sm text-white py-1 px-2 mt-4 block transition-colors " +
    "hover:text-green-dark";
  const getFeedbackColor = (): string =>
    formSubmitFeedback.sent ? "text-green-light" : "text-red";
  const imgClass = "w-32 transition-opacity hover:opacity-70 sm:w-24";
  const inputClass = "border rounded-sm p-1 " + focusStyle;
  const labelClass = "flex flex-col text-left font-semibold mt-4";
  const liClass = "p-10 sm:p-5";

  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const sendEmail = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();

    const response: JSONResponse | void = await fetch("/api/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res: Response): Promise<JSONResponse> => res.json())
      .catch((err) => {
        console.error("FAILED TO SEND MESSAGE!", err);
      });

    setFormSubmitFeedback({
      message: response ? response.message : "Unable to Send Message.",
      sent: response ? response.sent : false,
    });
    setFormData(emptyForm);
  };

  return (
    <>
      <NextSeo
        title="Contact"
        description="Where to reach me."
        openGraph={{ url: "https://kevinruffe.com/contact" }}
      />
      <PageLayout>
        <div className="text-center pt-16 sm:pt-4">
          <H1>Say Hello</H1>
          <form onSubmit={sendEmail} className="max-w-lg m-auto">
            <div className={`font-semibold ${getFeedbackColor()}`}>
              {formSubmitFeedback.message}
            </div>
            <label className={labelClass}>
              Your Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className={inputClass}
                required
              />
            </label>
            <label className={labelClass}>
              Your Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className={inputClass}
                required
              />
            </label>
            <label className={labelClass}>
              Message
              <textarea
                rows={5}
                cols={35}
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                className={inputClass}
                required
              />
            </label>
            <input
              type="text"
              name="phone"
              className="hidden"
              value={formData.phone}
              onChange={handleFormChange}
            />
            <button type="submit" className={buttonClass}>
              Send Message
            </button>
          </form>
          <h2 className="pt-8">Or find me here!</h2>
          <address>
            <ul className="flex items-center justify-center">
              <li className={liClass}>
                <a href="https://www.instagram.com/kevinjruffe/">
                  <Image
                    src="/instagram.png"
                    alt="Instagram"
                    priority
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
                    priority
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
