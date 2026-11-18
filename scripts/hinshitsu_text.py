"""Text rules that the checker and the lint script share: the banned words and what counts as a quotation.

Standard library only. The list follows the "Banned words" part of `skills/hinshitsu/SKILL.md`: the 12 words
and their inflected forms.
"""
import re

BANNED_RE = re.compile(
    r"(?<![A-Za-z])("
    r"should(?:n['’]t)?|shall|appropriate(?:ly)?|reasonabl[ey]|proper(?:ly)?|adequate(?:ly)?|"
    r"ensur(?:e|es|ed|ing)|(?:try|tries|tried|trying) to|as needed|if possible|generally|typically"
    r")(?![A-Za-z_])", re.I)


def strip_quotes(text, code_spans=True):
    """Blank what may hold a banned word without using it: code blocks, blockquotes, quotations, code spans.

    Line ends are kept, so that line n of the result is line n of the text.
    """
    text = re.sub(r"```.*?```", lambda m: "\n" * m.group(0).count("\n"), text, flags=re.S)
    text = re.sub(r"^\s*>.*$", " ", text, flags=re.M)
    text = re.sub(r'"[^"\n]*"', " ", text)
    text = re.sub(r"“[^”\n]*”", " ", text)
    if code_spans:
        text = re.sub(r"`[^`\n]*`", " ", text)
    return text
