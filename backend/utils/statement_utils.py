def get_latest_statement(statements: list):
    """
    Return the most recent financial statement.
    """
    if not statements:
        raise ValueError("No financial statements available.")

    return statements[0]