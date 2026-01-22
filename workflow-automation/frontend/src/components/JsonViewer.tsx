import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-md);
  padding: var(--spacing-3);
  font-size: var(--font-size-xs);
  font-family: monospace;
  overflow-x: auto;
  line-height: 1.6;
`;

const Line = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Indent = styled.span<{ $level: number }>`
  display: inline-block;
  width: ${(props) => props.$level * 16}px;
`;

const Toggle = styled.span`
  cursor: pointer;
  user-select: none;
  color: var(--color-gray-500);
  width: 12px;
  display: inline-block;
  
  &:hover {
    color: var(--color-gray-700);
  }
`;

const Key = styled.span`
  color: #0451a5;
  margin-right: 4px;
`;

const String = styled.span`
  color: #a31515;
`;

const Number = styled.span`
  color: #098658;
`;

const Boolean = styled.span`
  color: #0000ff;
`;

const Null = styled.span`
  color: #0000ff;
`;

const Bracket = styled.span`
  color: var(--color-gray-700);
`;

const Count = styled.span`
  color: var(--color-gray-500);
  font-style: italic;
  margin-left: 4px;
`;

interface JsonViewerProps {
  data: any;
}

export function JsonViewer({ data }: JsonViewerProps) {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleCollapse = (path: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderValue = (value: any, key: string | null, level: number, path: string): JSX.Element[] => {
    const lines: JSX.Element[] = [];

    if (value === null) {
      lines.push(
        <Line key={path}>
          <Indent $level={level} />
          {key !== null && <Key>"{key}": </Key>}
          <Null>null</Null>
        </Line>
      );
    } else if (typeof value === 'boolean') {
      lines.push(
        <Line key={path}>
          <Indent $level={level} />
          {key !== null && <Key>"{key}": </Key>}
          <Boolean>{value.toString()}</Boolean>
        </Line>
      );
    } else if (typeof value === 'number') {
      lines.push(
        <Line key={path}>
          <Indent $level={level} />
          {key !== null && <Key>"{key}": </Key>}
          <Number>{value}</Number>
        </Line>
      );
    } else if (typeof value === 'string') {
      lines.push(
        <Line key={path}>
          <Indent $level={level} />
          {key !== null && <Key>"{key}": </Key>}
          <String>"{value}"</String>
        </Line>
      );
    } else if (Array.isArray(value)) {
      const isCollapsed = collapsed.has(path);
      const itemCount = value.length;

      lines.push(
        <Line key={path}>
          <Indent $level={level} />
          <Toggle onClick={() => toggleCollapse(path)}>
            {isCollapsed ? '▶' : '▼'}
          </Toggle>
          {key !== null && <Key>"{key}": </Key>}
          <Bracket>[</Bracket>
          {isCollapsed && (
            <>
              <Count>{itemCount} {itemCount === 1 ? 'item' : 'items'}</Count>
              <Bracket>]</Bracket>
            </>
          )}
        </Line>
      );

      if (!isCollapsed) {
        value.forEach((item, index) => {
          lines.push(...renderValue(item, null, level + 1, `${path}[${index}]`));
        });
        lines.push(
          <Line key={`${path}-close`}>
            <Indent $level={level} />
            <Bracket>]</Bracket>
          </Line>
        );
      }
    } else if (typeof value === 'object') {
      const isCollapsed = collapsed.has(path);
      const keys = Object.keys(value);
      const keyCount = keys.length;

      lines.push(
        <Line key={path}>
          <Indent $level={level} />
          <Toggle onClick={() => toggleCollapse(path)}>
            {isCollapsed ? '▶' : '▼'}
          </Toggle>
          {key !== null && <Key>"{key}": </Key>}
          <Bracket>{'{'}</Bracket>
          {isCollapsed && (
            <>
              <Count>{keyCount} {keyCount === 1 ? 'key' : 'keys'}</Count>
              <Bracket>{'}'}</Bracket>
            </>
          )}
        </Line>
      );

      if (!isCollapsed) {
        keys.forEach((k) => {
          lines.push(...renderValue(value[k], k, level + 1, `${path}.${k}`));
        });
        lines.push(
          <Line key={`${path}-close`}>
            <Indent $level={level} />
            <Bracket>{'}'}</Bracket>
          </Line>
        );
      }
    }

    return lines;
  };

  return <Container>{renderValue(data, null, 0, 'root')}</Container>;
}
