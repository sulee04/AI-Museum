import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { SPECIMENS, getSpecimenVisualState } from '@/content/specimens'
import { useNarrativeStore } from '@/stores/narrativeStore'

export function PostProcessingStack() {
  const glitchIntensity = useNarrativeStore((s) => s.glitchIntensity)
  const reducedMotion = useNarrativeStore((s) => s.reducedMotion)
  const aaYearSmooth = useNarrativeStore((s) => s.aaYearSmooth)
  const hoveredId = useNarrativeStore((s) => s.hoveredSpecimenId)
  const mouse = useNarrativeStore((s) => s.mouse)

  let mutationFx = 0
  let deathGlitch = 0

  for (const specimen of SPECIMENS) {
    const state = getSpecimenVisualState(aaYearSmooth, specimen)
    if (!state) continue
    deathGlitch = Math.max(deathGlitch, state.glitch)
    if (hoveredId === specimen.id && state.alive) mutationFx = Math.max(mutationFx, 0.65)
  }

  if (hoveredId) mutationFx = Math.max(mutationFx, 0.35)
  const mouseEnergy = Math.max(0, 1 - Math.hypot(mouse.x, mouse.y) / 1.2) * 0.12
  const fx = glitchIntensity + mutationFx + deathGlitch * 0.55 + mouseEnergy

  if (reducedMotion) return null

  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.35 + fx * 0.65} luminanceThreshold={0.2} luminanceSmoothing={0.9} mipmapBlur />
      <Noise opacity={0.06 + fx * 0.32} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.2} darkness={0.65 + fx * 0.25} />
    </EffectComposer>
  )
}
