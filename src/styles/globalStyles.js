// src/styles/globalStyles.js
import { StyleSheet } from 'react-native';

const COLORS = {
  primary: '#5c4033',        // deep warm brown — from ref image button
  primaryDark: '#4a3028',    // darker brown for pressed state
  success: '#6b8f71',        // muted sage green
  danger: '#a64848',         // muted terracotta red
  warning: '#b8894a',        // warm amber
  white: '#faf8f5',          // warm off-white (ref: card background)
  background: '#cfc8bf',     // warm beige — exact bg from ref image
  surface: '#faf8f5',        // card surface, soft warm white
  border: '#e0dad3',         // warm light border
  textPrimary: '#2b1f17',    // deep warm brown-black
  textSecondary: '#6b5c50',  // medium warm brown
  textMuted: '#a3958a',      // dusty muted tone
  accentMuted: '#c4a99a',    // dusty rose-brown — from ref palette circle
};

export { COLORS };

export default StyleSheet.create({

  // ─── LAYOUT ───────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centered: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'flex-start',
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ─── TYPOGRAPHY ───────────────────────────────────────
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 23,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 6,
    marginLeft: 2,
    letterSpacing: 0.3,
  },
  link: {
    color: COLORS.primary,
    textAlign: 'center',
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
  },

  // ─── FORM ─────────────────────────────────────────────
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 0,
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: COLORS.textPrimary,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: '#fdf9f7',
  },

  // ─── BUTTONS ──────────────────────────────────────────
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#2b1f17',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  btnBio: {
    backgroundColor: COLORS.success,
    shadowColor: COLORS.success,
  },
  btnDanger: {
    backgroundColor: COLORS.danger,
    shadowColor: COLORS.danger,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 0.2,
  },
  btnOutlineText: {
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 15,
  },
  btnDisabled: {
    opacity: 0.5,
  },

  // ─── CARD ─────────────────────────────────────────────
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#2b1f17',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 6,
    color: COLORS.textPrimary,
  },
  cardDesc: {
    color: COLORS.textSecondary,
    lineHeight: 22,
    fontSize: 13,
  },

  // ─── HEADER (Home) ────────────────────────────────────
  header: {
    backgroundColor: COLORS.primary,
    padding: 28,
    paddingTop: 50,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: 4,
  },
  headerSubtitle: {
    color: COLORS.accentMuted,
    fontSize: 13,
    marginBottom: 14,
  },

  // ─── BADGE ────────────────────────────────────────────
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeGreen: {
    backgroundColor: COLORS.success,
  },
  badgeOrange: {
    backgroundColor: COLORS.warning,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },

  // ─── DIVIDER ──────────────────────────────────────────
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 20,
  },
  dividerText: {
    textAlign: 'center',
    color: COLORS.textMuted,
    fontSize: 13,
    marginVertical: 16,
  },
});