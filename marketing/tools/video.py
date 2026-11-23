import os
import runpy
import sys

MARKETING = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KIT = os.path.join(MARKETING, ".claude", "skills", "video-estudio", "scripts", "kit.py")

if not os.path.exists(KIT):
    raise SystemExit("kit não encontrado em %s" % KIT)

sys.argv[0] = KIT
runpy.run_path(KIT, run_name="__main__")
