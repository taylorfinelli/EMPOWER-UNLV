import Separator from "@/components/separator";
import Location from "./components/Location";
import Email from "./components/Email";
import Call from "./components/Call";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ContactFormData, contactFormSchema, submitContactRequest } from "@/api/contactForm";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const recaptchaRef = useRef(null);

  return (
    <div className="flex flex-col items-center py-16">
      <div className="w-[80%] flex flex-col gap-y-8">
        <Separator title="Contact" />
        <div className="flex flex-col-reverse md:flex-row gap-16">
          <div className="flex flex-col gap-y-8">
            <Location />
            <Email />
            <Call />
          </div>
          <form
            className="flex flex-col flex-1 gap-y-2"
            id="contactForm"
            onSubmit={handleSubmit(submitContactRequest)}
          >
            <h2>Send us an email</h2>
            <div>
              <Label>Your name</Label>
              <Input placeholder="John Doe" id="name" {...register("name")} />
              {errors.name && <Label className="text-red-600">{errors.name.message}</Label>}
            </div>
            <div>
              <Label>Email</Label>
              <Input placeholder="email@example.com" id="email" {...register("email")} />
              {errors.email && <Label className="text-red-600">{errors.email.message}</Label>}
            </div>
            <div>
              <Label>Message</Label>
              <Textarea placeholder="Message" id="message" {...register("message")} />
              {errors.message && <Label className="text-red-600">{errors.message.message}</Label>}
            </div>
            <ReCAPTCHA sitekey={siteKey} ref={recaptchaRef} />
            <Button className="w-24" disabled={!recaptchaRef.current} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
