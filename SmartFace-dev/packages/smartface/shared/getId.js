let counter = 0;

export default function getId(prefix = 'id') {
  return `${prefix}-${++counter}`;
}
