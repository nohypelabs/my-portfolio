"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { personalInfo } from "@/lib/data/personalInfo";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: personalInfo.contact.github,
    handle: `@${personalInfo.contact.github.split("/").pop()}`
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: personalInfo.contact.linkedin,
    handle: personalInfo.name
  },
  {
    name: "Email",
    icon: Mail,
    url: `mailto:${personalInfo.contact.email}`,
    handle: personalInfo.contact.email
  }
];

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-neutral-900">Get In Touch</h2>
          <p className="text-lg text-neutral-500 mb-12 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-[#FAFAFA] rounded-[35px] border border-neutral-400 p-6 hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 rounded-full bg-[#FAFAFA] group-hover:bg-[#d4aa82]/30 transition-colors">
                    <Icon className="w-6 h-6 text-[#c4956a] group-hover:text-[#a67d55] transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 text-neutral-900">{link.name}</h3>
                    <p className="text-sm text-neutral-500">{link.handle}</p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
