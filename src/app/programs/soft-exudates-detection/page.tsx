"use client";
import Image from "next/image";
import React from "react";
import Form from "./components/Form";
import Link from "next/link";

const Page = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <Link href="/programs" className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </Link>
      </div>
      <div className="p-6 md:p-14 md:pt-2">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Soft Exudate Detection In Retinal Fundus Images
        </h1>
        <p className="mb-4">
          This application is designed to detect soft exudates (SEx) in retinal
          fundus images using image processing algorithms combined with machine
          learning. All the code for this project is available on my{" "}
          <Link
            className="underline text-blue-700"
            target="_blank"
            href="https://github.com/AgustinCartaya/s2-soft-exudates-detection-in-fundus-images.git"
          >
            GitHub
          </Link>
          , and a detailed report can be found in the projects section of this
          website.
        </p>

        <h2 className="text-xl font-semibold mt-4">
          How to Use the Application
        </h2>
        <ul className="list-decimal list-inside mb-4">
          <li>Upload your fundus image in the designated area.</li>
          <li>
            Click <strong>Send</strong> to run the program.
          </li>
          <li>
            Wait for the result image (the analysis may take a few minutes).
          </li>
        </ul>
        <p>
          You can also use the provided test image to see how the application
          works by selecting <strong>Use Test Image</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-4">Image Requirements</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            The image must be a fundus image, centered on the eye with a black
            background.
          </li>
          <li>It should not contain any prior segmentations or annotations.</li>
          <li>The image must be in color.</li>
          <li>Minimum resolution: 1500 x 1500 pixels.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">Output</h2>
        <ul className="list-disc list-inside mb-4">
          <li>
            Initial candidates identified by a basic algorithm, contoured in
            white.
          </li>
          <li>Suspicious SEx candidates contoured in blue.</li>
          <li>The optical disc contoured in black.</li>
          <li>Number of candidates identified by a basic algorithm.</li>
          <li>Number of Suspicious SEx candidates.</li>
        </ul>
        <h1 className="text-xl text-center">Example</h1>
        <div className="flex justify-center">
          <Image
            width={600}
            height={100}
            className="rounded-md lg:rounded-l-lg"
            src={
              "/programs/s2_soft_exudates_detection_in_fundus_images/images/sex_detection_program_2.png"
            }
            alt={"sex_detection_program.png"}
          />
        </div>
        <h2 className="text-lg font-semibold">Important Notice</h2>
        <p>
          <mark>
            This application is intended for academic purposes only and is not
            validated for use by medical professionals. The results may not be
            fully accurate, as the algorithm is still under development.
          </mark>
        </p>

        <div className="flex items-center m-6">
          <hr className="flex-1 border-gray-400" />
          <span className="mx-4 text-2xl">Try the program</span>
          <hr className="flex-1 border-gray-400" />
        </div>
        <Form />
      </div>
    </div>
  );
};

export default Page;
