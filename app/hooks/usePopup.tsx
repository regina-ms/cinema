import {
  createContext,
  type FC,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import Filter from '~/ui/popups/Filter'

type AnyProps = Record<string, unknown>

type PopupContextValue = {
  isOpen: (name?: string) => boolean
  openPopup: <P extends keyof PopupRegistryProps>(name: P, props?: PopupRegistryProps[P]) => void
  closePopup: () => void
}

type PopupRegistryProps = {
  filter: AnyProps
}

type PopupComponent<P extends keyof PopupRegistryProps> = FC<
  { props?: PopupRegistryProps[P] } & { onClose: () => void }
>

type PopupRegistry = Record<keyof PopupRegistryProps, PopupComponent<keyof PopupRegistryProps>>

interface PopupProviderProps extends PropsWithChildren {
  registry: PopupRegistry
  portalContainer?: Element
}

type CurrentPopup = {
  name: keyof PopupRegistryProps
  props?: AnyProps
}

export const popupRegistry: PopupRegistry = {
  filter: Filter,
}

export const PopupContext = createContext<PopupContextValue | null>(null)

export function PopupProvider({ registry, portalContainer, children }: PopupProviderProps) {
  const [current, setCurrent] = useState<CurrentPopup | null>(null)

  const openPopup = useCallback<PopupContextValue['openPopup']>(
    (name, props) => {
      if (!registry[name]) {
        throw new Error(`Попап с названием '${name}' не найден`)
      }

      setCurrent({ name, props })
    },
    [registry],
  )

  const closePopup = useCallback<PopupContextValue['closePopup']>(() => setCurrent(null), [])

  const isOpen = useCallback<PopupContextValue['isOpen']>(
    (name?) => {
      if (!current) return false

      return name ? current.name === name : true
    },
    [current],
  )

  useEffect(() => {
    if (!current) return

    const onEscClick = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePopup()
    }

    window.addEventListener('keydown', onEscClick)

    return window.removeEventListener('keydown', onEscClick)
  }, [current, closePopup])

  const value = useMemo<PopupContextValue>(() => ({ openPopup, closePopup, isOpen }), [openPopup, closePopup, isOpen])

  const popupNode = current
    ? (() => {
        const Component = registry[current.name]
        const content = (
          <div
            className='opened fixed top-0 left-0 z-30 size-[100svh] bg-gray-600 bg-gray-600/50 backdrop-blur-sm'
            onClick={(e) => {
              if (e.target === e.currentTarget) closePopup()
            }}
          >
            <Component {...current.props} onClose={closePopup} />
          </div>
        )

        return createPortal(content, portalContainer ?? document.body)
      })()
    : null

  return (
    <PopupContext.Provider value={value}>
      {children}
      {popupNode}
    </PopupContext.Provider>
  )
}

export const usePopup = (): PopupContextValue => {
  const ctx = useContext(PopupContext)
  if (!ctx) throw new Error('Компонент, который использует useModal должен быть внутри компонента <PopupProvider>')
  return ctx
}
