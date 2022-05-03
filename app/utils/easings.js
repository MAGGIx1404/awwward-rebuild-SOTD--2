import GSAP from 'gsap'
import CustomEase from 'utils/CustomEase'

GSAP.registerPlugin(CustomEase)

export const DEFAULT = CustomEase.create('default', '0.77, 0, 0.175, 1')
export const CSS = 'cubic-bezier(0.77, 0, 0.175, 1)'
