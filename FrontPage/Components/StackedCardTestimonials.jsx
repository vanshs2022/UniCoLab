import { useState } from "react";
import { motion } from "framer-motion";
import {
  SiAtlassian,
  SiDribbble,
  SiGrubhub,
  SiKaggle,
  SiSlack,
  SiNike,
} from "react-icons/si";

const StackedCardTestimonials = () => {
  const [selected, setSelected] = useState(0);

  return (
    <section className="stackedcard bg-white py-24 px-4 lg:px-8 grid items-center grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 overflow-hidden">
      <div className="p-4">
        <h3 className="miss-title text-5xl font-semibold ">Our Mission</h3>
        <p className="miss-para text-black my-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
          commodi sint, similique cupiditate possimus suscipit delectus illum
          eos iure magnam!
        </p>
        <SelectBtns
          numTracks={testimonials.length}
          setSelected={setSelected}
          selected={selected}
        />
      </div>
      <Cards
        testimonials={testimonials}
        setSelected={setSelected}
        selected={selected}
      />
    </section>
  );
};

const SelectBtns = ({ numTracks, setSelected, selected }) => (
  <div className="flex gap-1 mt-8">
    {Array.from({ length: numTracks }).map((_, n) => (
      <button
        key={n}
        onClick={() => setSelected(n)}
        className="button h-1.5 w-full bg-slate-300 relative"
      >
        {selected === n ? (
          <motion.span
            className="select absolute top-0 left-0 bottom-0 bg-slate-950"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 5 }}
            onAnimationComplete={() =>
              setSelected((prev) => (prev === numTracks - 1 ? 0 : prev + 1))
            }
          />
        ) : (
          <span
            className="absolute top-0 left-0 bottom-0 bg-slate-950"
            style={{ width: selected > n ? "100%" : "0%" }}
          />
        )}
      </button>
    ))}
  </div>
);

const Cards = ({ testimonials, selected, setSelected }) => (
  <div className="p-4 relative h-[450px] lg:h-[500px] shadow-xl">
    {testimonials.map((t, i) => (
      <Card
        {...t}
        key={i}
        position={i}
        selected={selected}
        setSelected={setSelected}
      />
    ))}
  </div>
);

const Card = ({
  Icon,
  description,
  name,
  title,
  position,
  selected,
  setSelected,
}) => {
  const scale = position <= selected ? 1 : 1 + 0.015 * (position - selected);
  const offset = position <= selected ? 0 : 95 + (position - selected) * 3;
  const background = position % 2 ? "white" : "black";
  const color = position % 2 ? "black" : "white";

  return (
    <motion.div
      initial={false}
      style={{
        zIndex: position,
        transformOrigin: "left bottom",
        background,
        color,
      }}
      animate={{
        x: `${offset}%`,
        scale,
      }}
      whileHover={{
        translateX: position === selected ? 0 : -3,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      onClick={() => setSelected(position)}
      className="absolute top-0 left-0 w-full min-h-full p-8 lg:p-12 cursor-pointer flex flex-col justify-between"
    >
      <Icon className="text-7xl mx-auto" />
      <p className="text-lg lg:text-xl font-light italic my-8">
        "{description}"
      </p>
      <div>
        <span className="block font-semibold text-lg">{name}</span>
        <span className="block text-sm">{title}</span>
      </div>
    </motion.div>
  );
};

export default StackedCardTestimonials;

const testimonials = [
  {
    Icon: SiNike,
    description: "Lorem ipsum dolor...",
    name: "Jane Dodson",
    title: "Marketing Director, Nike",
  },
  {
    Icon: SiNike,
    description: "Lorem ipsum dolor...",
    name: "Jane Dodson",
    title: "Marketing Director, Nike",
  },{
    Icon: SiNike,
    description: "Lorem ipsum dolor...",
    name: "Jane Dodson",
    title: "Marketing Director, Nike",
  },
  // Additional testimonials...
];