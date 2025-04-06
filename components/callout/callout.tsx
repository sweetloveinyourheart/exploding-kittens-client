import { CSSProperties, FunctionComponent, ReactElement } from "react";
import { InfoCircledIcon, CrossCircledIcon, ExclamationTriangleIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { Responsive } from "@radix-ui/themes/props";

interface KittenCalloutProps {
    text: string
    type?: "info" | "error" | "warning" | "success"
    icon?: ReactElement

    // Base props
    asChild?: boolean
    size?: Responsive<"1" | "2" | "3">
    variant?: "soft" | "surface" | "outline"
    color?: "gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky"
    highContrast?: boolean

    // Element props
    className?: string
    style?: CSSProperties
}

const KittenCallout: FunctionComponent<KittenCalloutProps> = ({
    text,
    icon,
    type,
    asChild,
    size,
    variant,
    color,
    highContrast,
    style,
    className,
}) => {
    const getDefaultIcon = () => {
        switch (type) {
            case "error":
                return <CrossCircledIcon />;
            case "warning":
                return <ExclamationTriangleIcon />;
            case "success":
                return <CheckCircledIcon />;
            case "info":
            default:
                return <InfoCircledIcon />;
        }
    };

    const getDefaultColor = () => {
        switch (type) {
            case "error":
                return "red";
            case "warning":
                return "amber";
            case "success":
                return "grass";
            case "info":
            default:
                return "blue";
        }
    }

    return (
        <Callout.Root
            className={className}
            style={style}
            asChild={asChild}
            size={size}
            variant={variant}
            color={color || getDefaultColor()}
            highContrast={highContrast}
        >
            <Callout.Icon>
                {icon || getDefaultIcon()}
            </Callout.Icon>
            <Callout.Text>
                {text}
            </Callout.Text>
        </Callout.Root>
    );
}

export default KittenCallout;