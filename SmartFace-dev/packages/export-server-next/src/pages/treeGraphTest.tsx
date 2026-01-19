import type { Edge } from '@xyflow/react';

import { TreeGraph } from '../components/TreeGraph/TreeGraph';

const nodes: any[] = [
  {
    id: 'entry-1',
    type: 'treeNode',
    position: {
      x: -460,
      y: 255,
    },
    data: {
      title: 'Markus Schunkmiteinemlangennamen',
      subtitle: 'HRworks Holding',
      imageSrc: 'https://placedog.net/400/400',
      subsubtitle: 'CEO',
      entries: [
        {
          title: 'Simon Franz',
          subtitle: 'Entwicklung',
          subsubtitle: 'Bereichsleiter',
          imageSrc: 'http://placekitten.com/400/400',
          entries: [
            {
              title: 'Simeon Sembach',
              subtitle: 'Entwicklung',
              subsubtitle: 'Teamleiter',
              variant: 'highlighted',
              imageSrc: 'http://placekitten.com/400/400',
              isExpanded: false,
              id: '1000',
              hasChildEntries: true,
            },
          ],
          id: 'id-6802',
          isExpanded: true,
          hasChildEntries: true,
        },
      ],
      id: 'entry-1',
      isExpanded: true,
      hasChildEntries: true,
    },
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: 'id-6804',
    type: 'treeNode',
    position: {
      x: -140,
      y: 255,
    },
    data: {
      title: 'Zweiter Baum',
      subtitle: 'Ohne Inhalt',
      entries: [
        {
          title: 'Lukas Fettig',
          subtitle: 'Entwicklung',
          variant: 'greyedOut',
          subsubtitle: 'Werkstudent',
          imageSrc: 'http://placekitten.com/400/400',
          id: 'id-6803',
          isExpanded: true,
          hasChildEntries: false,
        },
      ],
      id: 'id-6804',
      isExpanded: true,
      hasChildEntries: true,
    },
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: 'id-6806',
    type: 'treeNode',
    position: {
      x: 180,
      y: 255,
    },
    data: {
      title: 'Dritter Baum',
      subtitle: 'Ohne Inhalt',
      entries: [
        {
          id: 'id-6805',
          isExpanded: true,
          hasChildEntries: false,
        },
      ],
      id: 'id-6806',
      isExpanded: true,
      hasChildEntries: true,
    },
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: 'id-6802',
    type: 'treeNode',
    position: {
      x: -460,
      y: 510,
    },
    data: {
      title: 'Simon Franz',
      subtitle: 'Entwicklung',
      subsubtitle: 'Bereichsleiter',
      imageSrc: 'http://placekitten.com/400/400',
      entries: [
        {
          title: 'Simeon Sembach',
          subtitle: 'Entwicklung',
          subsubtitle: 'Teamleiter',
          variant: 'highlighted',
          imageSrc: 'http://placekitten.com/400/400',
          isExpanded: false,
          id: '1000',
          hasChildEntries: true,
        },
      ],
      id: 'id-6802',
      isExpanded: true,
      hasChildEntries: true,
    },
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: 'id-6803',
    type: 'treeNode',
    position: {
      x: -140,
      y: 510,
    },
    data: {
      title: 'Lukas Fettig',
      subtitle: 'Entwicklung',
      variant: 'greyedOut',
      subsubtitle: 'Werkstudent',
      imageSrc: 'http://placekitten.com/400/400',
      id: 'id-6803',
      isExpanded: true,
      hasChildEntries: false,
      onLoadChildEntries: () => null,
    },
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: 'id-6805',
    type: 'treeNode',
    position: {
      x: 180,
      y: 510,
    },
    data: {
      id: 'id-6805',
      isExpanded: true,
      hasChildEntries: false,
    },
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
  {
    id: '1000',
    type: 'treeNode',
    position: {
      x: -460,
      y: 765,
    },
    data: {
      title: 'Simeon Sembach',
      subtitle: 'Entwicklung',
      subsubtitle: 'Teamleiter',
      variant: 'highlighted',
      imageSrc: 'http://placekitten.com/400/400',
      isExpanded: false,
      id: '1000',
      hasChildEntries: true,
    },
    targetPosition: 'top',
    sourcePosition: 'bottom',
  },
];

const edges: Edge[] = [
  {
    id: 'edge-root-entry-1',
    source: 'root',
    target: 'entry-1',
    type: 'treeEdge',
    focusable: false,
  },
  {
    id: 'edge-root-id-6804',
    source: 'root',
    target: 'id-6804',
    type: 'treeEdge',
    focusable: false,
  },
  {
    id: 'edge-root-id-6806',
    source: 'root',
    target: 'id-6806',
    type: 'treeEdge',
    focusable: false,
  },
  {
    id: 'edge-entry-1-id-6802',
    source: 'entry-1',
    target: 'id-6802',
    type: 'treeEdge',
    focusable: false,
  },
  {
    id: 'edge-id-6804-id-6803',
    source: 'id-6804',
    target: 'id-6803',
    type: 'treeEdge',
    focusable: false,
  },
  {
    id: 'edge-id-6806-id-6805',
    source: 'id-6806',
    target: 'id-6805',
    type: 'treeEdge',
    focusable: false,
  },
  {
    id: 'edge-id-6802-1000',
    source: 'id-6802',
    target: '1000',
    type: 'treeEdge',
    focusable: false,
  },
];

export default function Tree() {
  return <TreeGraph nodes={nodes} edges={edges} />;
}
