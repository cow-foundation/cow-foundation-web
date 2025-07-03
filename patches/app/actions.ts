// Stubbed out for static export - no server actions needed

export async function searchArticlesAction(params?: any): Promise<any> {
  // Return empty results for static build
  return { 
    success: true,
    data: {
      data: [],
      meta: {
        pagination: {
          total: 0
        }
      }
    }
  }
}