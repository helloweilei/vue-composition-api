import { DirectionalLight } from 'three'

type LightPosition = [number, number, number];

export function createDirectionalLight(
  position: LightPosition,
  color = 0xFFFFFF,
  intensity = 1
) {
  const light = new DirectionalLight(color, intensity);
  light.position.set(...position);
  return light;
}