/** Dummy exhibit image URLs for prologue bottom panel */
export const PROLOGUE_EXHIBIT_IMAGE_SRC: Record<string, string> = {
  'evt-turing-machine': 'https://picsum.photos/seed/turing1936/960/600',
  'evt-eniac': 'https://picsum.photos/seed/eniac1945/960/600',
  'evt-von-neumann': 'https://picsum.photos/seed/vonneumann/960/600',
  'evt-fortran': 'https://picsum.photos/seed/fortran1957/960/600',
  'evt-c-language': 'https://picsum.photos/seed/clang1972/960/600',
  'evt-oop-wave': 'https://picsum.photos/seed/oop1983/960/600',
  'evt-python': 'https://picsum.photos/seed/python1991/960/600',
  'evt-mcculloch-pitts': 'https://picsum.photos/seed/mcp1943/960/600',
  'evt-perceptron': 'https://picsum.photos/seed/perceptron1958/960/600',
  'evt-backprop': 'https://picsum.photos/seed/backprop1986/960/600',
  'evt-imagenet': 'https://picsum.photos/seed/imagenet2012/960/600',
  'evt-transformer': 'https://picsum.photos/seed/transformer2017/960/600',
}

export function getPrologueExhibitImageSrc(eventId: string): string {
  return (
    PROLOGUE_EXHIBIT_IMAGE_SRC[eventId] ??
    `https://picsum.photos/seed/${encodeURIComponent(eventId)}/960/600`
  )
}
