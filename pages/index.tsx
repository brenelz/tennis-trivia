import { useEffect, useRef, useState } from "react";

export default function Home() {
  return (
    <div className="bg-blue-500">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Tennis Trivia - Next.js Netlify</span>
        </h2>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
