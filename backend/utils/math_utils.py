from typing import SupportsFloat

Number = int | float | SupportsFloat


def safe_divide(
    numerator: Number | None,
    denominator: Number | None,
) -> float | None:
    if numerator is None or denominator in (None, 0):
        return None

    return float(numerator) / float(denominator)


def safe_round(
    value: Number | None,
    digits: int = 2,
) -> float | None:
    if value is None:
        return None

    return round(float(value), digits)


def to_percentage(
    value: Number | None,
    digits: int = 2,
) -> float | None:
    if value is None:
        return None

    return round(float(value) * 100, digits)


def percentage_change(
    current: Number | None,
    previous: Number | None,
    digits: int = 2,
) -> float | None:

    if current is None or previous in (None, 0):
        return None

    return round(((current - previous) / previous) * 100, digits)