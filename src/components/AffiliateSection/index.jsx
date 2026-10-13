import SectionLabel from "../ui/SectionLabel";
import ProductCard from "./ProductCard";
import BuildDropdown from "./BuildDropdown";
import { BEGINNER_SETUP, BETAFPV_MAIN, FEATURED } from "../../data/gear";

export default function AffiliateSection() {
  return (
    <div className="w-full pb-8">
      <p className="mb-6 text-xs text-white/50 leading-relaxed">
        Heads up: some of these are affiliate links. If you buy through them I get a small cut, at no
        extra cost to you. It helps keep the videos coming.
      </p>
      <SectionLabel title="Featured" subtitle="One kit. One purchase. Only $200 and you're in the air" />
      <div className="mb-6">
        <ProductCard product={FEATURED} />
      </div>
      <SectionLabel
        title="The Best Beginner FPV Setup"
        subtitle="Everything you need to start flying FPV + the same setup I started with ;)"
      />
      <div className="flex flex-col gap-3">
        {BEGINNER_SETUP.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <a
        href={BETAFPV_MAIN}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center w-full px-4 py-3 bg-white text-black text-sm font-semibold rounded-xl hover:bg-white/90 transition-colors"
      >
        Shop All BetaFPV →
      </a>

      <div className="mt-8">
        <SectionLabel
          title="My First 3.5&quot; Build"
          subtitle="The exact parts list from my first 3.5&quot; freestyle build"
        />
        <BuildDropdown />
      </div>
    </div>
  );
}
