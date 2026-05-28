from pydantic import BaseModel
from typing import Dict, Optional

class CleaningRules(BaseModel):
    table: str
    fill_missing: Optional[Dict[str, str]] = None   # {col: "mean"|"median"|"mode"}
    fill_value: Optional[Dict[str, str]] = None     # {col: "valeur_littérale"}
    remove_duplicates: bool = False
    fix_types: Optional[Dict[str, str]] = None
