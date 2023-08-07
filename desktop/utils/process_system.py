from win32security import AdjustTokenPrivileges, LookupPrivilegeValue, OpenProcessToken, TOKEN_ADJUST_PRIVILEGES, SE_PRIVILEGE_ENABLED, SE_SHUTDOWN_NAME, TOKEN_QUERY
from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
from win32api import GetCurrentProcess, SetSystemPowerState
from ctypes import windll, cast, POINTER
from comtypes import CLSCTX_ALL


@staticmethod
def get_volume():
    devices = AudioUtilities.GetSpeakers()
    interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
    volume = cast(interface, POINTER(IAudioEndpointVolume))
    current_volume_db = volume.GetMasterVolumeLevel()
    return volume, current_volume_db


@staticmethod
def set_volume(volume, volume_db):
    volume_db = max(min(volume_db, 0), -60)
    volume.SetMasterVolumeLevel(volume_db, None)


@staticmethod
def increase_volume():
    volume, current_volume_db = get_volume()
    set_volume(volume, current_volume_db + 2.0)


@staticmethod
def decrease_volume():
    volume, current_volume_db = get_volume()
    set_volume(volume, current_volume_db - 2.0)


@staticmethod
def lock_screen():
    windll.user32.LockWorkStation()


@staticmethod
def hibernate_system():
    priv_flags = (TOKEN_ADJUST_PRIVILEGES | TOKEN_QUERY)
    hToken = OpenProcessToken(GetCurrentProcess(), priv_flags)
    priv_id = LookupPrivilegeValue(None, SE_SHUTDOWN_NAME)
    old_privs = AdjustTokenPrivileges(
        hToken,
        0,
        [(priv_id, SE_PRIVILEGE_ENABLED)]
    )
    try:
        windll.powrprof.SetSuspendState(False, True, False)
    except:
        SetSystemPowerState(False, True)
    AdjustTokenPrivileges(hToken, 0, old_privs)
