from pydantic import BaseModel
from typing import Dict, Optional

class CleaningRules(BaseModel):
    table: str
    fill_missing: Optional[Dict[str, str]] = None
    remove_duplicates: bool = False
    fix_types: Optional[Dict[str, str]] = None
    outlier_handling: Optional[str] = None
