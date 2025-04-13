import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4 space-y-4 leading-tight">
      <Link href="https://peerlist.io/challenges/ui-animation-challenge" target="_blank" className="block hover:underline">
        <h1 className="">
          Peerlist
          <span className="text-xs">&nbsp;X&nbsp;</span>
          Aceternity
          <br />
          UI Animation Challenge
        </h1>
      </Link>
      <div>
        <p>Challenges</p>
        <ol className="list-decimal list-inside pl-4">
          <li>
            <Link href="/fluid-menu" className="hover:underline">
              Fluid Menu
            </Link>
          </li>
          <li>
            <Link href="/dynamic-status-indicator" className="hover:underline">
              Dynamic Status Indicator (Not Satisfied)
            </Link>
          </li>
        </ol>
      </div>
      <p>By <Link href="https://satyajit.xyz" target="_blank" className="hover:underline">Satyajit Chaudhary</Link></p>
    </div>
  );
}
