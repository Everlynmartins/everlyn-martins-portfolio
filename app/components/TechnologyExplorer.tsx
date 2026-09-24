"use client";

import { useState } from "react";
import Link from "next/link";
import { projects, experiences, technologyGroups } from "../data/portfolio";
import { TechnologyIcon } from "./TechnologyIcon";

export function TechnologyExplorer() {
  const [selected, setSelected] = useState("Python");
  const related = projects.filter(project => project.technologies.includes(selected));
  const experience = experiences.find(item => item.technologies.includes(selected));
  return (
    <div className="technology-explorer">
      <div className="technology-groups">
        {technologyGroups.map(group => (
          <div className="technology-group" key={group.name}>
            <h3>{group.name}</h3>
            <div>{group.technologies.map(technology => (
              <button type="button" key={technology} className={selected === technology ? "is-selected" : ""}
                aria-pressed={selected === technology} onClick={() => setSelected(technology)}>
                <TechnologyIcon name={technology} />{technology}
              </button>
            ))}</div>
          </div>
        ))}
      </div>
      <aside className="technology-context" aria-live="polite">
        <p>Onde utilizei</p><h3>{selected}</h3>
        <ul>{related.map(project => <li key={project.slug}><Link href={`/projetos/${project.slug}`}>{project.title} ↗</Link></li>)}
          {experience && <li><a href="#experiencia">{experience.organization}</a></li>}
        </ul>
      </aside>
    </div>
  );
}
